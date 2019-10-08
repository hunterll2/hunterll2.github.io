export const guideMenu = (type) => {
    const index = `
    <nav id="guideMenuBox">
        <h2>دليل اللعبة</h2>
        <div class="path">
            <button class="gameName disabled"><i class="fas fa-gamepad"></i>bloodborne</button>
        </div>
        <ul class="guideMenu boxes"></ul>
    </nav>
    `;
    const side = `
    <nav id="gameNav">
        <h2 title="فهرس مصنف للمقالات الخاصة باللعبة الحالية">
            <i class="fas fa-book"></i><span>دليل اللعبة</span><i class="fas fa-eye-slash hideIcon"></i>
        </h2>
        <div class="navPath hiddenToUp">
            <i class="fas fa-bezier-curve"></i>
            <span class="mainSection"></span>
            <span class="subSection"></span>
        </div>
        <ul class="guideMenu list"></ul>
    </nav>
    `;
    return type === "index" ? index : side;
};

export const editTools = () => `
<button id="editBtn" title="تعديل المقالة"><i class="fas fa-edit"></i><span>تعديل</span></button>
<button id="historyBtn" title="عرض تاريخ التعديلات للمقالة"><i class="fas fa-history"></i><span>التاريخ</span></button>
<button id="deleteBtn" title="حذف المقالة"><i class="fas fa-trash-alt"></i><span>حذف</span></button>
`;

export const footer = () => `
<footer>
    <div id="siteTools">
        <button class="icon hidden" id="asideBtn"><i class="fas fa-bars"></i></button>
        <button id="signFormBtn" title="تسجيل الدخول / التسجيل في الموقع"><i class="fas fa-user"></i><var>المستخدم</var></button>
        <button id="searchBtn" title="البحث في الموقع"><i class="fas fa-search"></i><span>بحث</span></button>
    </div>
    <nav class="hidden" id="sectionsNav">
        <-- List of all hidden sections -->
    </nav>
</footer>
`;