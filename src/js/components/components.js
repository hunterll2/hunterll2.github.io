export const editor = () => `
<div class="hiddenToUp" id="editor_add">
    <button><i class="fas fa-folder-plus"></i><span>إضافة قسم</span></button>
    <button><i class="fas fa-paragraph"></i><span>إضافة فقرة</span></button>
    <button><i class="fas fa-window-restore"></i><span>إضافة قالب</span></button>
    <button><i class="fas fa-table"></i><span>إضافة قالب جانبي</span></button>
</div>
<div class="hiddenToUp ltr" id="editor_edit">
    <button class="icon"><i class="fas fa-bold"></i></button>
    <button class="icon"><i class="fas fa-italic"></i></button>
    <button class="icon"><i class="fas fa-underline"></i></button>
    <button class="icon"><i class="fas fa-strikethrough"></i></button>
    <button class="icon"><i class="fas fa-palette"></i></button>
    <button class="icon"><i class="fas fa-tasks"></i></button>
    <button class="icon"><i class="fas fa-list-ol"></i></button>
    <button class="icon"><i class="fas fa-list-ul"></i></button>
    <button class="icon"><i class="fas fa-quote-right"></i></button>
    <button class="icon"><i class="fas fa-broom"></i></button>
</div>
`;

export const editTools = type => `
<div class="float-left" id="editTools">
    ${type === "edit" ? '<button id="editBtn" title="تعديل المقالة"><i class="fas fa-edit"></i><span>تعديل</span></button>': ''}
    ${type === "edit" ? '<button id="historyBtn" title="عرض تاريخ التعديلات للمقالة"><i class="fas fa-history"></i><span>التاريخ</span></button>': ''}
    ${type === "edit" ? '<button id="deleteBtn" title="حذف المقالة"><i class="fas fa-trash-alt"></i><span>حذف</span></button>': ''}
    <a href="#" class="button" title="إضافة مقالة جديدة"><i class="fas fa-plus"></i><span>إضافة</span></a>
</div>

`;

export const guideMenu = (type, state) => {
    const side = `
    <nav id="gameNav" ${state === "active" ? '' : 'class="unactive"'}>
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
    const index = `
    <nav id="guideMenuBox">
        <h2>دليل اللعبة</h2>
        <div class="path">
            <button class="gameName disabled"><i class="fas fa-gamepad"></i>bloodborne</button>
        </div>
        <ul class="guideMenu boxes"></ul>
    </nav>
    `;
    return type === "side" ? side : index;
};

export const articleNav = () => `
<nav id="articleNav">
    <h2 title="فهرس لتنقل بين العناوين الرئيسية ضمن المقالة الحالية">
        <i class="fas fa-stream"></i><span>العناوين الرئيسية</span><i class="fas fa-eye-slash hideIcon"></i>
    </h2>

    <ul>
    </ul>
</nav>
`;

export const signForm = state => `
<section id="signForm" ${state === "visible" ? '' : 'class="hidden"'}>
    <h2><i class="fas fa-door-open"></i>تسجيل الدخول</h2>
    <form>
        <fieldset>
            <label for="username"><i class="fas fa-user-alt"></i>اسم المستخدم</label>
            <input type="text" id="username" placeholder="ادخل اسم المستخدم..." />
            <label for="password"><i class="fas fa-key"></i>كلمة المرور</label>
            <input type="password" id="password" placeholder="ادخل كلمة المرور..." />
        </fieldset>
        <fieldset>
            <input type="submit" id="signIn_submit" value="تسجيل الدخول" />
            <button id="signUp_submit"><i class="fas fa-user-plus"></i><span>إنشاء حساب جديد</span></button>
        </fieldset>
        <fieldset id="signTools">
            <label><input type="checkbox" checked="checked" />تذكرني</label>
            <label><a href="#">نسيت بيانات المستخدم؟</a></label>
        </fieldset>
    </form>
</section>
`;

export const siteTools = (type) => `
<div id="siteTools">
    ${type === "phone" ? '<button class="icon" id="asideBtn"><i class="fas fa-bars"></i></button>' : ''}
    <button id="signFormBtn" title="تسجيل الدخول / التسجيل في الموقع"><i class="fas fa-user"></i><var>المستخدم</var></button>
    <button id="searchBtn" title="البحث في الموقع"><i class="fas fa-search"></i><span>بحث</span></button>
</div>
`;

export const sectionsNav = () => `
<nav class="hidden" id="sectionsNav">
    <-- List of all hidden sections -->
</nav>
`;

export const articleTools = () => `
<div id="articleTools">
    <button id="commentsBtn"><i class="fas fa-comments"></i><span>التعليقات (<var id="commentsCount">c</var>)</span></button>
    <button class="icon" id="goUpBtn" title="الإنتقال إلى بداية المقالة"><i class="fas fa-chevron-circle-up"></i></button>
    <button class="icon" id="fullPageBtn" title="عرض المقالة بوضع القراءة"><i class="fas fa-book-reader"></i></button>
</div>
`;