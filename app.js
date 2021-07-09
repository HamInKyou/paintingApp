const canvas = document.querySelector("#jsCanvas");
//canvas는 html의 한 요소로, context를 갖는다.
//context라는 건 이 요소 안에서 우리가 픽셀에 접근할 수 있는 방법이다.
const ctx = canvas.getContext("2d"); //context를 이용해서 convas 위의 픽셀에 접근하겠다!

//canvas는 속성으로 width, height만 가진다.
//이 width와 height의 영역 안에서만 그릴 수 있다.
//css의 width, height랑은 별개!
canvas.width = 700;
canvas.height = 700;

//context의 default 설정
ctx.strokeStyle = "#2c2c2c"; //펜의 색상
ctx.lineWidth = 2.5; //펜의 두께

//그림 그리는 상태를 나타내는 변수 -> false면 그림 그리는 중이 아니다.
let painting = false;

function startPainting() {
  painting = true;
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
    ctx.beginPath(); //라인의 시작을 명시해준다. (이제 시작할거야)
    ctx.moveTo(x, y); //라인을 만들기 시작할 위치를 이 좌표로 옮긴다.
  } else {
    ctx.lineTo(x, y); //시작 좌표에서 이 좌표까지 라인을 이어준다. ( 그 다음 lineTo는 전 lineTo 끝난 지점을 시작 지점으로 삼는다.)
    ctx.stroke(); // lineTo에 의해 만들어진 라인에 선을 그어서 그림을 그려준다!  (이거까지 해야 canvas에 그림이 그려진다.)
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);

  //캔버스 위에서 마우스 클릭했을 때 발생하는 이벤트
  canvas.addEventListener("mousedown", startPainting);

  //캔버스 위에서 마우스 클릭하고 있다가 떼었을 때 발생하는 이벤트
  canvas.addEventListener("mouseup", stopPainting);

  //캔버스 위에 있다가 마우스가 캔버스 위를 벗어났을 때 발생하는 이벤트
  canvas.addEventListener("mouseleave", stopPainting);
}
