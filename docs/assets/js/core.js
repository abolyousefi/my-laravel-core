/**
 * Core Laravel UI JavaScript Controller & Utilities Library
 * Enterprise Persian RTL Components, Ajax Engine, Toast Notifications & Dialogs
 * 
 * Version: 2.0.0
 */

(function (window, document) {
    'use strict';

    const Core = {
        version: '2.0.0',
        controllers: {},

        ready: function (fn) {
            if (document.readyState !== 'loading') {
                fn();
            } else {
                document.addEventListener('DOMContentLoaded', fn);
            }
        },

        delay: function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        debounce: function (fn, ms = 300) {
            let timer = null;
            return function (...args) {
                clearTimeout(timer);
                timer = setTimeout(() => fn.apply(this, args), ms);
            };
        },

        generateUUID: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        /* =========================================================================
         * FORMATTING & CONVERSION UTILITIES (ابزارهای فرمت و تبدیل فارسی)
         * ========================================================================= */
        format: {
            persianDigits: function (str) {
                if (str === null || str === undefined) return '';
                const farsi = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
                return String(str).replace(/[0-9]/g, w => farsi[+w]);
            },

            englishDigits: function (str) {
                if (str === null || str === undefined) return '';
                const farsi = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
                const arabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
                let res = String(str);
                for (let i = 0; i < 10; i++) {
                    res = res.replace(new RegExp(farsi[i], 'g'), i);
                    res = res.replace(new RegExp(arabic[i], 'g'), i);
                }
                return res;
            },

            toman: function (amount, showUnit = true, persianDigits = true) {
                const raw = Core.format.englishDigits(amount).replace(/[^0-9.-]/g, '');
                if (!raw) return '';
                const parts = Number(raw).toLocaleString('en-US');
                const res = persianDigits ? Core.format.persianDigits(parts) : parts;
                return showUnit ? `${res} تومان` : res;
            },

            rial: function (amount, showUnit = true, persianDigits = true) {
                const raw = Core.format.englishDigits(amount).replace(/[^0-9.-]/g, '');
                if (!raw) return '';
                const parts = Number(raw).toLocaleString('en-US');
                const res = persianDigits ? Core.format.persianDigits(parts) : parts;
                return showUnit ? `${res} ریال` : res;
            },

            cardNumber: function (card, separator = '-') {
                const clean = Core.format.englishDigits(card).replace(/[^0-9]/g, '');
                if (clean.length !== 16) return card;
                return clean.match(/.{1,4}/g).join(separator);
            },

            sheba: function (sheba) {
                let clean = Core.format.englishDigits(sheba).replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                if (!clean.startsWith('IR')) clean = 'IR' + clean;
                return clean.match(/.{1,4}/g).join('-');
            },

            /**
             * Convert number to Persian words (e.g. 1500000 => یک میلیون و پانصد هزار).
             */
            numberToWords: function (number) {
                number = parseInt(Core.format.englishDigits(number), 10);
                if (isNaN(number) || number === 0) return 'صفر';
                if (number < 0) return 'منفی ' + Core.format.numberToWords(Math.abs(number));

                const ones = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
                const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
                const tens = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
                const hundreds = ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
                const scales = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

                const numStr = number.toString();
                const groups = [];
                for (let i = numStr.length; i > 0; i -= 3) {
                    groups.push(parseInt(numStr.substring(Math.max(0, i - 3), i), 10));
                }

                const result = [];
                for (let idx = 0; idx < groups.length; idx++) {
                    const group = groups[idx];
                    if (group === 0) continue;

                    const h = Math.floor(group / 100);
                    const t = Math.floor((group % 100) / 10);
                    const o = group % 10;

                    const groupWords = [];
                    if (h > 0) groupWords.push(hundreds[h]);

                    if (t === 1) {
                        groupWords.push(teens[o]);
                    } else {
                        if (t > 1) groupWords.push(tens[t]);
                        if (o > 0) groupWords.push(ones[o]);
                    }

                    const scaleWord = scales[idx];
                    const scaleSuffix = scaleWord ? ' ' + scaleWord : '';
                    result.push(groupWords.join(' و ') + scaleSuffix);
                }

                return result.reverse().join(' و ');
            }
        },

        /* =========================================================================
         * TOAST NOTIFICATION ENGINE (سیستم نوتیفیکیشن تست مدرن)
         * ========================================================================= */
        notify: {
            container: null,

            getContainer: function () {
                if (!this.container) {
                    this.container = document.getElementById('core-toast-container');
                    if (!this.container) {
                        this.container = document.createElement('div');
                        this.container.id = 'core-toast-container';
                        this.container.className = 'toast-container position-fixed bottom-0 start-0 p-3';
                        this.container.style.zIndex = '99999';
                        document.body.appendChild(this.container);
                    }
                }
                return this.container;
            },

            show: function (message, title = '', type = 'info', duration = 4000) {
                const container = this.getContainer();
                const toast = document.createElement('div');
                toast.className = `toast align-items-center text-bg-${type} border-0 show shadow-lg mb-2`;
                toast.setAttribute('role', 'alert');
                toast.setAttribute('aria-live', 'assertive');
                toast.setAttribute('aria-atomic', 'true');

                const icons = {
                    success: 'fa-check-circle',
                    danger: 'fa-circle-xmark',
                    warning: 'fa-triangle-exclamation',
                    info: 'fa-circle-info'
                };
                const icon = icons[type] || 'fa-bell';

                toast.innerHTML = `
                    <div class="d-flex">
                        <div class="toast-body d-flex align-items-center gap-2">
                            <i class="fa ${icon} fs-5"></i>
                            <div>
                                ${title ? `<div class="fw-bold">${title}</div>` : ''}
                                <div>${message}</div>
                            </div>
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="بستن"></button>
                    </div>
                `;

                container.appendChild(toast);

                const closeBtn = toast.querySelector('.btn-close');
                closeBtn?.addEventListener('click', () => toast.remove());

                if (duration > 0) {
                    setTimeout(() => {
                        toast.classList.remove('show');
                        setTimeout(() => toast.remove(), 300);
                    }, duration);
                }
            },

            success: function (message, title = 'موفقیت‌آمیز') {
                this.show(message, title, 'success');
            },

            error: function (message, title = 'خطا') {
                this.show(message, title, 'danger');
            },

            warning: function (message, title = 'هشدار') {
                this.show(message, title, 'warning');
            },

            info: function (message, title = 'اطلاع‌رسانی') {
                this.show(message, title, 'info');
            }
        },

        /* =========================================================================
         * MODAL & CONFIRM DIALOGS (دیالوگ تأیید و پنجره‌های پاپ‌آپ)
         * ========================================================================= */
        dialog: {
            confirm: function (options) {
                const title = options.title || 'آیا مطمئن هستید؟';
                const message = options.message || 'این عملیات قابل بازگشت نخواهد بود.';
                const confirmText = options.confirmText || 'بله، انجام بده';
                const cancelText = options.cancelText || 'انصراف';
                const variant = options.variant || 'danger';

                const modalId = 'core-confirm-modal';
                let modalEl = document.getElementById(modalId);
                if (!modalEl) {
                    modalEl = document.createElement('div');
                    modalEl.id = modalId;
                    modalEl.className = 'modal fade';
                    modalEl.tabIndex = -1;
                    document.body.appendChild(modalEl);
                }

                modalEl.innerHTML = `
                    <div class="modal-dialog modal-dialog-centered modal-sm">
                        <div class="modal-content rounded-4 border-0 shadow">
                            <div class="modal-body text-center p-4">
                                <div class="rounded-circle bg-${variant}-subtle text-${variant} d-inline-flex p-3 mb-3">
                                    <i class="fa fa-triangle-exclamation fs-3"></i>
                                </div>
                                <h5 class="fw-bold mb-2">${title}</h5>
                                <p class="text-muted small mb-4">${message}</p>
                                <div class="d-flex gap-2 justify-content-center">
                                    <button type="button" class="btn btn-light border px-3" data-bs-dismiss="modal">${cancelText}</button>
                                    <button type="button" class="btn btn-${variant} px-3" id="core-confirm-btn">${confirmText}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                const bsModal = new window.bootstrap.Modal(modalEl);
                bsModal.show();

                const confirmBtn = modalEl.querySelector('#core-confirm-btn');
                confirmBtn.onclick = function () {
                    bsModal.hide();
                    if (typeof options.onConfirm === 'function') {
                        options.onConfirm();
                    }
                };
            }
        },

        /* =========================================================================
         * CLIPBOARD HELPER (کپی در کلیپ‌بورد با یک کلیک)
         * ========================================================================= */
        clipboard: {
            copy: function (text, successMessage = 'در کلیپ‌بورد کپی شد!') {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(() => {
                        Core.notify.success(successMessage);
                    }).catch(() => {
                        Core.clipboard.fallbackCopy(text, successMessage);
                    });
                } else {
                    Core.clipboard.fallbackCopy(text, successMessage);
                }
            },

            fallbackCopy: function (text, successMessage) {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    Core.notify.success(successMessage);
                } catch (err) {
                    Core.notify.error('خطا در کپی متن!');
                }
                document.body.removeChild(textArea);
            }
        },

        /* =========================================================================
         * AJAX & HTTP ENGINE (موتور درخواست‌های AJAX با CSRF خودکار)
         * ========================================================================= */
        ajax: {
            getCSRFToken: function () {
                const meta = document.querySelector('meta[name="csrf-token"]');
                return meta ? meta.getAttribute('content') : '';
            },

            request: async function (url, options = {}) {
                const defaults = {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': Core.ajax.getCSRFToken()
                    }
                };

                const merged = Object.assign({}, defaults, options);
                merged.headers = Object.assign({}, defaults.headers, options.headers || {});

                try {
                    const response = await fetch(url, merged);
                    const data = await response.json().catch(() => ({}));

                    if (!response.ok) {
                        const errMsg = data.message || `خطای سرور (${response.status})`;
                        Core.notify.error(errMsg);
                        throw data;
                    }

                    return data;
                } catch (err) {
                    throw err;
                }
            },

            get: function (url, params = {}) {
                const query = new URLSearchParams(params).toString();
                const fullUrl = query ? `${url}?${query}` : url;
                return Core.ajax.request(fullUrl, { method: 'GET' });
            },

            post: function (url, data = {}) {
                return Core.ajax.request(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }
        },

        /* =========================================================================
         * TABLE CONTROLLER (مدیریت جداول، جستجوی زنده، چک‌باکس‌ها و عملیات گروهی)
         * ========================================================================= */
        table: {
            init: function () {
                // Check all checkboxes
                document.querySelectorAll('[data-core-check-all]').forEach(masterCheck => {
                    masterCheck.addEventListener('change', function () {
                        const table = masterCheck.closest('table');
                        if (!table) return;

                        const rowChecks = table.querySelectorAll('[data-core-row-check]');
                        rowChecks.forEach(rc => rc.checked = masterCheck.checked);
                        Core.table.updateBulkBar(table);
                    });
                });

                // Row checkbox change
                document.addEventListener('change', function (e) {
                    if (e.target.matches('[data-core-row-check]')) {
                        const table = e.target.closest('table');
                        if (table) Core.table.updateBulkBar(table);
                    }
                });

                // Live search with debounce
                document.querySelectorAll('[data-core-table-search]').forEach(input => {
                    input.addEventListener('input', Core.debounce(function () {
                        input.closest('form')?.submit();
                    }, 500));
                });
            },

            updateBulkBar: function (table) {
                const rowChecks = table.querySelectorAll('[data-core-row-check]:checked');
                const count = rowChecks.length;
                const wrapper = table.closest('.card') || table.parentElement;
                const bulkBar = wrapper.querySelector('[data-core-bulk-bar]');
                const countBadge = wrapper.querySelector('[data-core-selected-count]');

                if (bulkBar) {
                    if (count > 0) {
                        bulkBar.classList.remove('d-none');
                        bulkBar.classList.add('d-flex');
                        if (countBadge) countBadge.textContent = Core.format.persianDigits(count);
                    } else {
                        bulkBar.classList.remove('d-flex');
                        bulkBar.classList.add('d-none');
                    }
                }
            },

            getSelectedIds: function (tableSelector) {
                const table = document.querySelector(tableSelector);
                if (!table) return [];
                return Array.from(table.querySelectorAll('[data-core-row-check]:checked')).map(c => c.value);
            }
        }
    };

    /* =========================================================================
     * COMPONENT CONTROLLER CLASSES (کنترلرهای مستقل فرم و ویجت‌ها)
     * ========================================================================= */
    class NumberInputController {
        constructor(el) {
            this.input = el;
            this.decimals = parseInt(el.dataset.decimals || '0', 10);
            this.separator = el.dataset.separator || ',';
            this.persianDigits = el.dataset.persianDigits === 'true';

            this.init();
        }

        init() {
            this.input.addEventListener('input', () => this.formatValue());
            this.input.addEventListener('blur', () => this.formatValue());
        }

        formatValue() {
            let val = Core.format.englishDigits(this.input.value).replace(/[^0-9.-]/g, '');
            if (!val) return;

            let parts = val.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.separator);

            if (this.decimals > 0 && parts[1]) {
                parts[1] = parts[1].substring(0, this.decimals);
            }

            let formatted = parts.join('.');
            if (this.persianDigits) {
                formatted = Core.format.persianDigits(formatted);
            }

            this.input.value = formatted;
        }
    }

    class TextareaController {
        constructor(el) {
            this.el = el;
            this.max = parseInt(el.getAttribute('maxlength') || '0', 10);
            this.counter = document.querySelector(el.dataset.counterTarget);
            this.autoResize = el.dataset.autoResize === 'true';

            this.init();
        }

        init() {
            this.el.addEventListener('input', () => {
                this.updateCounter();
                if (this.autoResize) this.resize();
            });
            this.updateCounter();
        }

        updateCounter() {
            if (!this.counter) return;
            const current = this.el.value.length;
            this.counter.textContent = `${Core.format.persianDigits(current)} / ${Core.format.persianDigits(this.max)}`;
        }

        resize() {
            this.el.style.height = 'auto';
            this.el.style.height = this.el.scrollHeight + 'px';
        }
    }

    // -------------------------------------------------------------
    // Global Auto Initializer
    // -------------------------------------------------------------
    function initAll() {
        // Number Inputs
        document.querySelectorAll('[data-component="number-input"], [data-thousand-separator]').forEach(el => new NumberInputController(el));

        // Textareas
        document.querySelectorAll('textarea[data-component="textarea"], textarea[data-counter-target]').forEach(el => new TextareaController(el));

        // Confirm Dialogs via data-core-confirm
        document.addEventListener('click', function (e) {
            const btn = e.target.closest('[data-core-confirm]');
            if (!btn) return;

            e.preventDefault();
            const message = btn.dataset.coreConfirm || 'آیا مطمئن هستید؟';
            const form = btn.closest('form');
            const href = btn.getAttribute('href');

            Core.dialog.confirm({
                title: 'تأیید عملیات',
                message: message,
                onConfirm: function () {
                    if (form && btn.type === 'submit') {
                        form.submit();
                    } else if (href && href !== '#') {
                        window.location.href = href;
                    }
                }
            });
        });

        // Copy buttons via data-core-copy
        document.addEventListener('click', function (e) {
            const copyBtn = e.target.closest('[data-core-copy]');
            if (!copyBtn) return;

            const text = copyBtn.dataset.coreCopy;
            Core.clipboard.copy(text);
        });

        // Table controllers
        Core.table.init();

        // Initialize Bootstrap tooltips
        if (window.bootstrap && window.bootstrap.Tooltip) {
            document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new window.bootstrap.Tooltip(el));
        }
    }

    Core.initAll = initAll;
    Core.ready(initAll);

    // Export Core globally (and aliases)
    window.Core = Core;
    window.core = Core;
    window.doravel = Core;

})(window, document);
