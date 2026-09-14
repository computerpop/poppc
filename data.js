// 1. 기존 수리 항목 리스트 (썸네일 카드 유지)[cite: 3]
const repairList = [
    {
        title: "용도별 맞춤 컴퓨터 조립",
        desc: "게임, 사무, 작업용 가성비 최적화 견적 설계 및 깔끔한 선정리 출고.",
        date: "전문 작업",
        url: "컴퓨터조립.html",
        img: "다운로드.jpg"
    },
    {
        title: "옛날 비디오 테이프 디지털 변환",
        desc: "VHS, 6mm, 8mm 아날로그 테이프를 컴퓨터/USB 파일로 깨끗하게 변환.",
        date: "인기 서비스",
        url: "비디오테이프변환.html",
        img: "다운로드.jfif"
    },
    {
        title: "노트북 액정 파손 패널 교체",
        desc: "화면 깨짐, 줄 생김, 무한 깜빡임 증상 정품 패널 신속 교체.",
        date: "당일 수리",
        url: "노트북액정수리.html",
        img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "그래픽카드 서멀구리스 재도포",
        desc: "높은 발열, 쿨러 소음, 셧다운 현상 해결을 위한 프리미엄 서멀 재도포.",
        date: "발열/소음 해결",
        url: "그래픽카드수리.html",
        img: "gpu_thermal_1.jpg"
    }
];

// 2. 우측 고정 전화 버튼 및 깔끔한 공구함(툴박스) 영역 생성[cite: 3]
(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        .floating-call-btn {
            position: fixed;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            background-color: #03c75a;
            color: white;
            padding: 15px 18px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: bold;
            font-size: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 99999;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            letter-spacing: 2px;
            transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .floating-call-btn:hover {
            transform: translateY(-50%) scale(1.05);
            background-color: #02b350;
        }

        /* 👉 광고 느낌을 뺀 담백하고 깔끔한 툴박스 틀 */
        .simple-toolbox-wrap {
            width: 100%;
            display: flex;
            justify-content: center;
            margin: 0 0 25px 0;
            box-sizing: border-box;
        }
        .simple-toolbox {
            width: 100%;
            max-width: 900px;
            background: #fdfdfd;
            border: 1px solid #d9d9d9;
            border-radius: 6px;
            padding: 15px 18px;
            box-sizing: border-box;
        }
        .toolbox-label {
            font-size: 14px;
            font-weight: 700;
            color: #555555;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        /* 툴 버튼들이 배치될 공간 (나중에 다른 툴 추가 시 여기에 나란히 배치 가능) */
        .toolbox-content {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .tool-shortcut-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background-color: #ffffff;
            color: #222222;
            padding: 10px 16px;
            border-radius: 4px;
            border: 1px solid #cccccc;
            font-weight: 600;
            text-decoration: none;
            font-size: 14px;
            transition: all 0.15s ease;
        }
        .tool-shortcut-btn:hover {
            background-color: #f0f0f0;
            border-color: #999999;
        }
    `;
    document.head.appendChild(style);

    // 우측 중앙 고정 전화 버튼 생성[cite: 3]
    if (!document.getElementById('floatingCallBtn')) {
        const callBtn = document.createElement('a');
        callBtn.id = 'floatingCallBtn';
        callBtn.href = 'tel:01079168608';
        callBtn.className = 'floating-call-btn';
        callBtn.innerHTML = '📞 전화문의';
        document.body.appendChild(callBtn);
    }

    // '주요 서비스 품목' 타이틀 바로 위에 툴박스 삽입
    window.addEventListener('DOMContentLoaded', function() {
        if (document.getElementById('simpleToolboxArea')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'simple-toolbox-wrap';
        wrapper.id = 'simpleToolboxArea';
        wrapper.innerHTML = `
            <div class="simple-toolbox">
                <div class="toolbox-label">
                    🛠️ 유틸리티 툴박스
                </div>
                <div class="toolbox-content">
                    <!-- 👉 나중에 다른 툴이 생기면 이 버튼 옆으로 쭉 추가하시면 됩니다 -->
                    <a href="키보드 테스트 사이트.html" class="tool-shortcut-btn">
                        ⌨️ 키보드 & 마우스 테스트
                    </a>
                </div>
            </div>
        `;

        // "주요 서비스 품목" 타이틀 요소를 찾아 그 바로 위에 삽입
        let targetEl = null;
        const allElements = document.querySelectorAll('h2, h3, h4, div, span, p');
        for (let el of allElements) {
            if (el.textContent && el.textContent.includes('주요 서비스 품목') && el.children.length < 2) {
                targetEl = el;
                break;
            }
        }

        if (targetEl && targetEl.parentNode) {
            targetEl.parentNode.insertBefore(wrapper, targetEl);
        } else {
            const fallbackEl = document.querySelector('h1');
            if (fallbackEl && fallbackEl.parentNode) {
                fallbackEl.parentNode.insertBefore(wrapper, fallbackEl.nextSibling);
            } else {
                document.body.insertBefore(wrapper, document.body.firstChild);
            }
        }
    });
})();