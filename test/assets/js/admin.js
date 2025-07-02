/**
 * admin.js - لوحة التحكم
 * 
 * هذا الملف يحتوي على جميع الوظائف الخاصة بلوحة التحكم
 * وواجهة تسجيل الدخول
 */

// تهيئة لوحة التحكم عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل لوحة التحكم بنجاح');
    
    // التحقق من تسجيل الدخول
    checkLoginStatus();
    
    // تفعيل وظائف لوحة التحكم
    setupAdminFunctions();
});

// التحقق من حالة تسجيل الدخول
function checkLoginStatus() {
    const isDashboard = document.querySelector('.admin-dashboard');
    
    if (isDashboard) {
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        
        if (!isLoggedIn) {
            window.location.href = 'login.html';
        }
    }
}

// تهيئة وظائف لوحة التحكم
function setupAdminFunctions() {
    // تفعيل القائمة الجانبية
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // تفعيل القائمة المنسدلة للملف الشخصي
    const adminProfile = document.querySelector('.admin-profile');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (adminProfile && profileDropdown) {
        adminProfile.addEventListener('click', function() {
            profileDropdown.classList.toggle('show');
        });
    }
    
    // تفعيل زر تسجيل الخروج
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        });
    }
    
    // تفعيل اختيار الألوان
    const colorOptions = document.querySelectorAll('.color-option');
    
    if (colorOptions.length > 0) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // تفعيل زر "اذهب إلى الموقع"
    const goToSiteLinks = document.querySelectorAll('[id^="goToSiteLink"]');
    goToSiteLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const baseUrl = window.location.href.split('/admin/')[0];
            window.location.href = baseUrl + '/index.html';
        });
    });
    
    // تفعيل إدارة المستخدمين
    const addUserBtn = document.querySelector('.btn-add-user');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            const username = document.getElementById('newUsername').value;
            const password = document.getElementById('newPassword').value;
            const role = document.getElementById('newUserRole').value;
            
            if (!username || !password) {
                showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            // إضافة المستخدم الجديد إلى الجدول
            const usersTable = document.querySelector('.users-table tbody');
            const newRow = document.createElement('tr');
            
            newRow.innerHTML = `
                <td>${username}</td>
                <td>${getRoleName(role)}</td>
                <td><span class="status active">نشط</span></td>
                <td>
                    <button class="btn-edit-user" data-user="${username}"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete-user" data-user="${username}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            usersTable.appendChild(newRow);
            
            // إضافة مستمعات الأحداث للأزرار الجديدة
            setupUserActions(newRow);
            
            // إظهار الإشعار
            showNotification(`تم إضافة المستخدم ${username} بنجاح!`);
            
            // تفريغ الحقول
            document.getElementById('newUsername').value = '';
            document.getElementById('newPassword').value = '';
        });
    }
    
    // تفعيل أزرار تحرير وحذف المستخدمين
    setupUserActions();
    
    // تفعيل التبديل بين الأقسام
    const sections = {
        dashboardLink: 'mainContent',
        designLink: 'designSection',
        pagesLink: 'pagesSection',
        galleryLink: 'gallerySection',
        headerLink: 'headerSection',
        bannerLink: 'bannerSection',
        footerLink: 'footerSection',
        settingsLink: 'settingsSection',
        usersLink: 'usersSection'
    };
    
    // إخفاء جميع الأقسام وإظهار القسم الرئيسي
    function hideAllSections() {
        document.getElementById('designSection').style.display = 'none';
        document.getElementById('pagesSection').style.display = 'none';
        document.getElementById('gallerySection').style.display = 'none';
        document.getElementById('headerSection').style.display = 'none';
        document.getElementById('bannerSection').style.display = 'none';
        document.getElementById('footerSection').style.display = 'none';
        document.getElementById('settingsSection').style.display = 'none';
        document.getElementById('usersSection').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    }
    
    // تفعيل الروابط
    for (const [linkId, sectionId] of Object.entries(sections)) {
        const link = document.getElementById(linkId);
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                hideAllSections();
                document.getElementById(sectionId).style.display = 'block';
                
                // تحديث القائمة الجانبية
                document.querySelectorAll('.admin-nav li').forEach(li => {
                    li.classList.remove('active');
                });
                this.parentElement.classList.add('active');
            });
        }
    }
    
    // تفعيل الروابط السريعة
    const quickLinks = {
        galleryQuickLink: 'gallerySection',
        pagesQuickLink: 'pagesSection',
        usersQuickLink: 'usersSection',
        settingsQuickLink: 'settingsSection'
    };
    
    for (const [linkId, sectionId] of Object.entries(quickLinks)) {
        const link = document.getElementById(linkId);
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                hideAllSections();
                document.getElementById(sectionId).style.display = 'block';
                
                // تحديث القائمة الجانبية
                document.querySelectorAll('.admin-nav li').forEach(li => {
                    li.classList.remove('active');
                });
                document.getElementById(linkId.replace('QuickLink', 'Link')).parentElement.classList.add('active');
            });
        }
    }
    
    // تفعيل إضافة أزرار الهيدر
    const addHeaderButton = document.getElementById('addHeaderButton');
    if (addHeaderButton) {
        addHeaderButton.addEventListener('click', function() {
            const container = document.getElementById('headerButtonsContainer');
            const newButton = document.createElement('div');
            newButton.className = 'button-manager';
            newButton.innerHTML = `
                <input type="text" class="form-control" placeholder="اسم الزر">
                <input type="text" class="form-control" placeholder="الرابط أو القسم">
                <button class="btn-remove"><i class="fas fa-times"></i></button>
            `;
            container.appendChild(newButton);
            
            // تفعيل زر الحذف
            newButton.querySelector('.btn-remove').addEventListener('click', function() {
                newButton.remove();
            });
        });
    }
    
    // تفعيل أزرار حذف الهيدر الموجودة
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
    
    // تفعيل حفظ أزرار الهيدر
    const saveHeaderButtons = document.getElementById('saveHeaderButtons');
    if (saveHeaderButtons) {
        saveHeaderButtons.addEventListener('click', function() {
            const buttonsContainer = document.getElementById('headerButtonsContainer');
            const buttonManagers = buttonsContainer.querySelectorAll('.button-manager');
            const buttonsData = [];
            
            buttonManagers.forEach(manager => {
                const inputs = manager.querySelectorAll('input');
                if (inputs.length >= 2) {
                    buttonsData.push({
                        text: inputs[0].value,
                        url: inputs[1].value
                    });
                }
            });
            
            // حفظ البيانات في localStorage (أو إرسالها إلى الخادم)
            localStorage.setItem('headerButtons', JSON.stringify(buttonsData));
            
            showNotification('تم حفظ أزرار الهيدر بنجاح!');
        });
    }
    
    // تفعيل حفظ التخصيصات
    const saveButtons = document.querySelectorAll('.btn-save');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.closest('.section');
            const sectionTitle = section.querySelector('.section-header h2').textContent;
            showNotification(`تم حفظ تغييرات قسم "${sectionTitle}" بنجاح!`);
        });
    });
}

// وظيفة للحصول على اسم الدور
function getRoleName(roleKey) {
    const roles = {
        'admin': 'مدير كامل',
        'editor': 'محرر',
        'author': 'ناشر'
    };
    return roles[roleKey] || roleKey;
}

// تهيئة وظائف أزرار المستخدمين
function setupUserActions(row = null) {
    const editButtons = row ? 
        row.querySelectorAll('.btn-edit-user') : 
        document.querySelectorAll('.btn-edit-user');
        
    const deleteButtons = row ? 
        row.querySelectorAll('.btn-delete-user') : 
        document.querySelectorAll('.btn-delete-user');
    
    // تفعيل أزرار التحرير
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const username = row.cells[0].textContent;
            showNotification(`ستتمكن قريباً من تعديل المستخدم: ${username}`);
        });
    });
    
    // تفعيل أزرار الحذف
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const username = row.cells[0].textContent;
            
            if (confirm(`هل أنت متأكد من رغبتك في حذف المستخدم ${username}؟`)) {
                row.remove();
                showNotification(`تم حذف المستخدم ${username} بنجاح`);
            }
        });
    });
}

// وظيفة لعرض الإشعارات
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// وظيفة لحماية المسارات
function protectAdminRoutes() {
    const adminPages = ['dashboard.html', 'login.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (adminPages.includes(currentPage)) {
        // التحقق من حالة تسجيل الدخول
        const isLoginPage = currentPage === 'login.html';
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        
        if (isLoginPage && isLoggedIn) {
            window.location.href = 'dashboard.html';
        } else if (!isLoginPage && !isLoggedIn) {
            window.location.href = 'login.html';
        }
    }
}

// استدعاء وظيفة حماية المسارات عند تحميل الصفحة
protectAdminRoutes();