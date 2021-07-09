const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

const canvas = document.querySelector("#jsCanvas");
//canvas는 html의 한 요소로, context를 갖는다.
//context라는 건 이 요소 안에서 우리가 픽셀에 접근할 수 있는 방법이다.
const ctx = canvas.getContext("2d"); //context를 이용해서 convas 위의 픽셀에 접근하겠다!

//canvas는 속성으로 width, height만 가진다.
//이 width와 height의 영역 안에서만 그릴 수 있다.
//css의 width, height랑은 별개!
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//context의 default 설정
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height); //기본적으로 캔버스의 배경을 흰색으로 깔아주고 시작하자.
ctx.strokeStyle = INITIAL_COLOR; //펜의 색상
ctx.fillStyle = INITIAL_COLOR; //채우기 색상
ctx.lineWidth = 2.5; //펜의 두께

const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

//그림 그리는 상태를 나타내는 변수 -> false면 그림 그리는 중이 아니다.
let painting = false;

//현재 filling 모드인지 나타내는 변수 -> true면 filling Mode 상태
let filling = false;

function startPainting(event) {
  ctx.beginPath(); //라인의 시작을 명시해준다. (이제 시작할거야)
  if (event.which === 1) {
    //마우스 좌클릭 때만 그림 그려지게
    painting = true;
  }
}

function stopPainting() {
  //그림그리기를 멈추게 하는 함수
  painting = false;
}

//마우스가 canvas 안에서 움직일 때 감지
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.moveTo(x, y); //라인을 만들기 시작할 위치를 이 좌표로 옮긴다.
  } else {
    ctx.lineTo(x, y); //시작 좌표에서 이 좌표까지 라인을 이어준다. ( 그 다음 lineTo는 전 lineTo 끝난 지점을 시작 지점으로 삼는다.)
    ctx.stroke(); // lineTo에 의해 만들어진 라인에 선을 그어서 그림을 그려준다!  (이거까지 해야 canvas에 그림이 그려진다.)
  }
}

//캔버스 클릭할 때 이벤트 핸들링
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

//캔버스 우클릭할 때 이벤트 핸들링
function handleContextMenu(event) {
  //우클릭할 때 기본적으로 발생하는 contextMenu를 안나타나게 한다!
  //캔버스 우클릭해서 이미지 다른이름으로 저장 못하게!
  //우리가 만든 save 버튼을 통해서만 이미지 저장할 수 있게!
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);

  //캔버스 위에서 마우스 클릭했을 때 발생하는 이벤트
  canvas.addEventListener("mousedown", startPainting);

  //캔버스 위에서 마우스 클릭하고 있다가 떼었을 때 발생하는 이벤트
  canvas.addEventListener("mouseup", stopPainting);

  //캔버스 위에 있다가 마우스가 캔버스 위를 벗어났을 때 발생하는 이벤트
  canvas.addEventListener("mouseleave", stopPainting);

  //캔버스를 클릭
  canvas.addEventListener("click", handleCanvasClick);

  //캔버스 우클릭하면 발생하는 이벤트
  canvas.addEventListener("contextmenu", handleContextMenu);
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; //strokeStyle(펜 색깔)을 선택한 요소의 배경색깔로 바꿔준다.
  ctx.fillStyle = color; //fillStyle(채우기 색깔)을 선택한 요소의 배경색깔로 바꿔준다.
}
colors.forEach((color) => color.addEventListener("click", handleColorClick));

function handleRangeChange(event) {
  const lineWidth = event.target.value;
  ctx.lineWidth = lineWidth;
}
if (range) {
  //range는 값을 바꿀 때마다 input이 새로 설정되어 이벤트가 발생한다.
  range.addEventListener("input", handleRangeChange);
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png"); //캔버스의 데이터를 이미지 URL로 변환해준다!
  const link = document.createElement("a");
  link.href = image; //이미지 URL을 a태그랑 연결해준다.
  //download 속성을 부여하여 그 URL을 통해 이미지를 다운받을 수 있게 해준다.
  //download에 넣는 값은 이미지 다운로드 받을 때 그 파일 이름을 지정해주는 것! -> 꼭 지정해줘야한다!
  link.download = "painJs[EXPORT]";
  link.click(); //만든 a태그를 바로 클릭해준다
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
