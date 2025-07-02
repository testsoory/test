/**
 * main.js - الموقع الرئيسي
 * 
 * هذا الملف يحتوي على جميع الوظائف الأساسية للموقع الرئيسي
 * ولا يحتوي على أي وظائف خاصة بلوحة التحكم
 */

// تهيئة الموقع عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الموقع الرئيسي بنجاح');
    
    // يمكنك إضافة أي وظائف إضافية للموقع الرئيسي هنا
    // مثل القوائم المتحركة، الشرائح، إلخ.
    
    // مثال: تفعيل القائمة المنسدلة للهاتف المحمول
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('nav ul');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('show');
        });
    }
    
    // مثال: تفعيل شرائح الخدمات
    const serviceCards = document.querySelectorAll('.feature-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// وظائف عامة للموقع
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

// وظيفة لتعديل اللون
function adjustColor(color, amount) {
    let usePound = false;
    
    if (color[0] === "#") {
        color = color.slice(1);
        usePound = true;
    }
    
    const num = parseInt(color, 16);
    let r = (num >> 16) + amount;
    
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    
    let b = ((num >> 8) & 0x00FF) + amount;
    
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    
    let g = (num & 0x0000FF) + amount;
    
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}