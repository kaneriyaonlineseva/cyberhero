// PrintPro QR Payment System

let qrInterval = null;

function initPaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (!modal) return;
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closePaymentModal();
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePaymentModal();
        }
    });
}

function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (!modal) return;
    
    modal.classList.add('active');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Generate QR
    generateQR();
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    
    if (qrInterval) clearInterval(qrInterval);
}

function generateQR() {
    const canvas = document.getElementById('qrCanvas');
    const amount = document.getElementById('amountInput')?.value || '';
    const upiId = 'printpro@ybl'; // Change to your UPI ID
    
    let upiUrl = `upi://pay?pa=${upiId}&pn=PrintPro&cu=INR`;
    if (amount && parseFloat(amount) > 0) {
        upiUrl += `&am=${parseFloat(amount).toFixed(2)}`;
    }
    
    if (typeof QRious !== 'undefined') {
        new QRious({
            element: canvas,
            value: upiUrl,
            size: 200,
            level: 'H'
        });
    }
}

function setAmount(value) {
    const amountInput = document.getElementById('amountInput');
    if (amountInput) {
        amountInput.value = value;
        generateQR();
    }
}

function copyUPI() {
    const upiId = 'printpro@ybl';
    navigator.clipboard.writeText(upiId);
    showToast('UPI ID copied!', 'success');
}

// Auto-refresh QR every 30 seconds
function startQRRefresh() {
    if (qrInterval) clearInterval(qrInterval);
    qrInterval = setInterval(() => {
        const modal = document.getElementById('paymentModal');
        if (modal && modal.classList.contains('active')) {
            generateQR();
        }
    }, 30000);
}

// Load when ready
document.addEventListener('DOMContentLoaded', () => {
    initPaymentModal();
    startQRRefresh();
});