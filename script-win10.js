// HTMLをウィンドウの中に包む
function createWindow(id, title, content) {
    const windowHTML = `
    <div id="${id}" class="window">
        <div class="window-header">
            <span class="window-title">${title}</span>
            <button class="close-btn" onclick="closeWindow('${id}')">X</button>
        </div>
        <div class="window-body">
            ${content}
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', windowHTML);

    // 初期設定
    const windowElement = document.getElementById(id);
    windowElement.style.position = 'absolute';
    windowElement.style.top = '100px';
    windowElement.style.left = '100px';

    // ドラッグ機能
    let isDragging = false;
    let offsetX, offsetY;

    windowElement.querySelector('.window-header').addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - windowElement.offsetLeft;
        offsetY = e.clientY - windowElement.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            windowElement.style.left = e.clientX - offsetX + 'px';
            windowElement.style.top = e.clientY - offsetY + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

function closeWindow(id) {
    const windowElement = document.getElementById(id);
    if (windowElement) {
        windowElement.remove();
    }
}

function openNotepad() {
    const content = `
    <textarea id="notepad" rows="20" cols="50" placeholder="Type your notes here..."></textarea>
    `;
    createWindow('notepadWindow', 'Notepad', content);
}

function openEdge() {
    const content = `
    <div>
        <input type="text" id="urlInput" placeholder="Enter URL here..." style="width: 100%; box-sizing: border-box;">
        <button onclick="loadUrl()">Load URL</button>
        <iframe id="edgeIframe" src="" style="width: 100%; height: 400px; border: none; margin-top: 10px;"></iframe>
    </div>
    <script>
        function loadUrl() {
            const url = document.getElementById('urlInput').value;
            const iframe = document.getElementById('edgeIframe');
            if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                iframe.src = url;
            } else {
                alert('Please enter a valid URL starting with http:// or https://');
            }
        }
    </script>
    `;
    createWindow('edgeWindow', 'Microsoft Edge', content);
}

function openPaint() {
    const content = `
    <canvas id="paintCanvas" width="500" height="400" style="border:1px solid #000000;"></canvas>
    <script>
        const canvas = document.getElementById('paintCanvas');
        const ctx = canvas.getContext('2d');
        let painting = false;

        function startPosition(e) {
            painting = true;
            draw(e);
        }

        function endPosition() {
            painting = false;
            ctx.beginPath();
        }

        function draw(e) {
            if (!painting) return;
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'black';

            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        }

        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', endPosition);
        canvas.addEventListener('mousemove', draw);
    </script>
    `;
    createWindow('paintWindow', 'Paint', content);
}

function openSettings() {
    const content = `
    <h2>Settings</h2>
    <p>Here you can adjust the theme color and other design settings.</p>
    <input type="color" id="themeColor" name="themeColor" value="#ffffff">
    <label for="themeColor">Select Theme Color</label>
    <script>
        document.getElementById('themeColor').addEventListener('input', (e) => {
            document.body.style.backgroundColor = e.target.value;
        });
    </script>
    `;
    createWindow('settingsWindow', 'Settings', content);
}

// イベントリスナーの設定
document.getElementById('startBtn').addEventListener('click', () => {
    document.getElementById('startMenu').style.display = 'block';
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('endMenu').style.display = 'flex';
});

document.getElementById('endMenu').addEventListener('click', () => {
    document.getElementById('startMenu').style.display = 'none';
    document.getElementById('endMenu').style.display = 'none';
    document.getElementById('startBtn').style.display = 'flex';
});

// アプリを開くためのボタンの設定
document.getElementById('openNotepad').addEventListener('click', openNotepad);
document.getElementById('openEdge').addEventListener('click', openEdge);
document.getElementById('openPaint').addEventListener('click', openPaint);
document.getElementById('openSettings').addEventListener('click', openSettings);

// コンテキストメニューの設定
document.onclick = hideMenu;
document.oncontextmenu = rightClick;

function hideMenu() {
    document.getElementById("contextMenu").style.display = "none";
}

function rightClick(e) {
    e.preventDefault();
    const menu = document.getElementById("contextMenu");
    if (menu.style.display === "block") {
        hideMenu();
    } else {
        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
    }
}
