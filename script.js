// 초기 승률 설정 (주최자는 51%로 설정)
let winRate = 51;

// DOM 요소 가져오기
const betAmountElement = document.getElementById('bet-amount');
const organizerChoiceElement = document.getElementById('organizer-choice');
const playerChoiceElement = document.getElementById('player-choice');
const playButton = document.getElementById('play-button');
const choiceButtons = document.querySelectorAll('.btn-choice');
const resultSection = document.getElementById('result');

// 게임 시작 버튼 클릭 이벤트
playButton.addEventListener('click', function() {
    // 베팅 금액 가져오기
    const betAmount = parseInt(betAmountElement.value);

    // 참가자의 선택 확인
    let playerSelection = null;
    choiceButtons.forEach(button => {
        if (button.classList.contains('selected')) {
            playerSelection = button.getAttribute('data-choice');
        }
    });

    if (!playerSelection || isNaN(betAmount) || betAmount <= 0) {
        Swal.fire({
            icon: 'error',
            title: '입력 오류',
            text: '베팅 금액을 올바르게 입력하고 홀 또는 짝을 선택해주세요.'
        });
        return;
    }

    // 주최자의 선택 (랜덤하게 홀(1) 또는 짝(2) 선택)
    const organizerSelection = Math.random() < 0.5 ? '홀' : '짝';
    organizerChoiceElement.textContent = organizerSelection;

    // 참가자의 선택 표시
    playerChoiceElement.textContent = playerSelection;

    // 게임 결과 계산 및 표시
    setTimeout(function() { // 결과를 약간의 딜레이 후에 표시
        if (organizerSelection === playerSelection) {
            // 승리한 경우
            const winnings = betAmount * 1.25; // 베팅 금액의 1.25배
            Swal.fire({
                icon: 'success',
                title: '승리!',
                text: `축하합니다! 베팅한 금액의 1.25배인 $${winnings}을 획득하셨습니다.`
            });
        } else {
            // 패배한 경우
            Swal.fire({
                icon: 'error',
                title: '패배',
                text: `아쉽지만 베팅한 금액 $${betAmount}을 모두 잃으셨습니다.`
            });
        }
        resultSection.classList.remove('hidden'); // 결과 섹션을 보이도록 설정
    }, 1000); // 1초 딜레이 후 결과 표시
});

// 홀짝 선택 버튼 클릭 이벤트
choiceButtons.forEach(button => {
    button.addEventListener('click', function() {
        choiceButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});
