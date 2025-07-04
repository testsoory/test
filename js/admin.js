document.addEventListener('DOMContentLoaded', function() {
    // التحقق من صحة الدخول
    if (!localStorage.getItem('adminAuth') && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
    }

    // تسجيل الخروج
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('adminAuth');
            window.location.href = 'login.html';
        });
    }
    
    // تبديل القوائم الجانبية
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('active');
        });
    }
    
    // تنقل بين الأقسام
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.section-content').forEach(section => {
                section.classList.remove('active');
            });
            
            document.querySelector(targetId).classList.add('active');
            
            if (window.innerWidth < 768) {
                document.querySelector('.sidebar').classList.remove('active');
            }
        });
    });
    
    // إضافة عناصر القائمة
    const addItemBtn = document.querySelector('.btn-add-item');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', function() {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <input type="text" placeholder="نص الرابط">
                <input type="text" placeholder="الرابط">
                <button class="btn-remove"><i class="fas fa-times"></i></button>
            `;
            document.querySelector('.menu-items').appendChild(menuItem);
            
            const removeBtn = menuItem.querySelector('.btn-remove');
            removeBtn.addEventListener('click', function() {
                menuItem.remove();
            });
        });
    }
    
    // إضافة أحداث لحذف عناصر القائمة الموجودة
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-remove')) {
            e.target.closest('.menu-item').remove();
        }
    });
    
    // معاينة رفع الصورة
    const logoUpload = document.getElementById('logo-upload');
    if (logoUpload) {
        logoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    document.getElementById('logo-preview').src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
        
        document.querySelector('.btn-upload').addEventListener('click', function() {
            logoUpload.click();
        });
    }
    
    // تبديل التبويبات في الإعدادات
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // دالة تحديث المعاينة
    window.updatePreview = function() {
        const logoText = document.getElementById('logo-text').value;
        document.getElementById('preview-logo-text').textContent = logoText;
    };

    // دالة حفظ الإعدادات
    window.saveSettings = function() {
        // يمكنك استبدال هذا الجزء باتصال مع Render في المستقبل
        alert('تم حفظ التغييرات بنجاح!');
        // إضافة مؤشر نجاح
        const saveBtn = document.querySelector('.btn-save');
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-check"></i> تم الحفظ!';
        saveBtn.style.background = '#198754';
        
        setTimeout(() => {
            saveBtn.innerHTML = originalText;
            saveBtn.style.background = '';
        }, 2000);
    };
    
    // تحديث المعاينة أول مرة
    updatePreview();
});