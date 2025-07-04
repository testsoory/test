import { saveSettings, loadSettings } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    // التحقق من تسجيل الدخول
    if (!localStorage.getItem('adminLoggedIn') && !location.pathname.endsWith('login.html')) {
        window.location.href = 'login.html';
        return;
    }

    // تسجيل الدخول
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            if (password === 'admin123') {
                localStorage.setItem('adminLoggedIn', 'true');
                window.location.href = 'admin.html';
            } else {
                alert('كلمة المرور غير صحيحة');
            }
        });
    }

    // تحميل الإعدادات
    if (location.pathname.endsWith('admin.html')) {
        const settings = await loadSettings();
        if (settings.logoText) {
            document.getElementById('logo-text').value = settings.logoText;
        }
    }

    // حفظ الإعدادات
    const saveBtn = document.querySelector('.btn-save');
    if (saveBtn) {
        saveBtn.addEventListener('click', async () => {
            const settings = {
                logoText: document.getElementById('logo-text').value
            };
            
            const result = await saveSettings(settings);
            if (result.status === 'success') {
                alert('تم الحفظ بنجاح!');
            }
        });
    }
});