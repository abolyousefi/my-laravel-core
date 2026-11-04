/**
 * Core Laravel UI JavaScript Controller & Utilities Library
 * Enterprise Persian RTL Components, Ajax Engine, Toast Notifications & Dialogs
 * 
 * Version: 2.0.0
 */

(function (window, document) {
    'use strict';

    const readyCallbacks = [];

    const Core = {
        version: '2.1.0',
        controllers: {},
        translations: window.abolframe?.translations || {},

        ready: function (fn, zone) {
            const runner = (rootContext = document) => {
                if (zone) {
                    const matched = rootContext.querySelector ? rootContext.querySelector(zone) : null;
                    if (matched) {
                        fn(matched);
                    } else if (rootContext.matches && rootContext.matches(zone)) {
                        fn(rootContext);
                    }
                } else {
                    fn(rootContext);
                }
            };

            readyCallbacks.push(runner);

            if (document.readyState !== 'loading') {
                runner(document);
            } else {
                document.addEventListener('DOMContentLoaded', () => runner(document));
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

    /* =========================================================================
     * ABOLFRAME INFRASTRUCTURE JS HELPERS (02-js-helpers.md)
     * ========================================================================= */

    function resolveTargetElement(target) {
        if (!target) return null;
        if (target instanceof Element) return target;
        if (window.jQuery && target instanceof window.jQuery) return target[0] || null;
        if (typeof target === 'string') {
            if (target.startsWith('#') || target.startsWith('.') || target.startsWith('[')) {
                return document.querySelector(target);
            }
            return document.getElementById(target)
                || document.querySelector(`[name="${target}"]`)
                || document.querySelector(target);
        }
        return null;
    }

    function mergeRecursive(target, source) {
        const isObject = obj => obj && typeof obj === 'object' && !Array.isArray(obj);
        if (!isObject(target) || !isObject(source)) {
            return Array.isArray(target) && Array.isArray(source)
                ? target.concat(source)
                : source;
        }
        const output = Object.assign({}, target);
        Object.keys(source).forEach(key => {
            if (isObject(source[key]) && key in target && isObject(target[key])) {
                output[key] = mergeRecursive(target[key], source[key]);
            } else if (Array.isArray(source[key]) && Array.isArray(target[key])) {
                output[key] = target[key].concat(source[key]);
            } else {
                output[key] = source[key];
            }
        });
        return output;
    }

    function __(key, attributes = {}) {
        const dict = window.abolframe?.translations || Core.translations || {};
        let text = key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict);
        if (typeof text !== 'string') {
            text = dict[key] || key;
        }
        if (attributes && typeof attributes === 'object') {
            Object.keys(attributes).forEach(attr => {
                text = text
                    .replace(new RegExp(`\\{\\s*${attr}\\s*\\}`, 'g'), attributes[attr])
                    .replace(new RegExp(`:${attr}\\b`, 'g'), attributes[attr]);
            });
        }
        return text;
    }

    function replacePersianDigits(value) {
        return Core.format.englishDigits(value);
    }

    function convertAmountToText(amount, suffix = 'تومان') {
        if (amount === null || amount === undefined || amount === '') return false;
        const clean = Core.format.englishDigits(String(amount)).replace(/,/g, '').trim();
        if (!clean || isNaN(Number(clean))) return false;
        const words = Core.format.numberToWords(clean);
        if (!words) return false;
        return suffix ? `${words} ${suffix}`.trim() : words;
    }

    function getFormElementValueText(name, value, form = null) {
        const root = form ? (resolveTargetElement(form) || document) : document;
        const el = root.querySelector(`[name="${name}"]`);
        if (!el) return String(value ?? '');

        if (el.tagName === 'SELECT') {
            const opt = Array.from(el.options).find(o => String(o.value) === String(value));
            return opt ? opt.text.trim() : String(value ?? '');
        }

        if (el.type === 'radio' || el.type === 'checkbox') {
            const checked = root.querySelector(`[name="${name}"][value="${value}"]`);
            if (checked) {
                const label = checked.closest('label') || root.querySelector(`label[for="${checked.id}"]`);
                if (label) return label.textContent.trim();
            }
        }

        return el.value || String(value ?? '');
    }

    function showAlert(type, message, title = '', options = {}) {
        if (window.Swal && typeof window.Swal.fire === 'function') {
            return window.Swal.fire(Object.assign({
                icon: type === 'danger' ? 'error' : type,
                title: title,
                text: message,
                confirmButtonText: 'متوجه شدم'
            }, options));
        }

        return new Promise(resolve => {
            Core.notify.show(message, title, type === 'error' ? 'danger' : type);
            resolve({ isConfirmed: true });
        });
    }

    function showToast(type, message, title = '', options = {}) {
        if (window.toastr && typeof window.toastr[type] === 'function') {
            return window.toastr[type](message, title, options);
        }
        const mapped = type === 'error' ? 'danger' : type;
        Core.notify.show(message, title, mapped, options?.timeOut || 4000);
    }

    function showConfirmationMessage(config = {}) {
        if (window.Swal && typeof window.Swal.fire === 'function') {
            return window.Swal.fire({
                title: config.title || 'آیا مطمئن هستید؟',
                text: config.text || config.message || '',
                icon: config.type === 'danger' ? 'warning' : (config.type || 'question'),
                showCancelButton: true,
                confirmButtonText: config.confirmButtonText || 'بله',
                cancelButtonText: config.cancelButtonText || 'انصراف'
            }).then(result => {
                if (result.isConfirmed && typeof config.onConfirm === 'function') {
                    config.onConfirm();
                } else if (!result.isConfirmed && typeof config.onCancel === 'function') {
                    config.onCancel();
                }
                return result;
            });
        }

        return new Promise(resolve => {
            Core.dialog.confirm({
                title: config.title || 'آیا مطمئن هستید؟',
                message: config.text || config.message || '',
                variant: config.type || 'danger',
                onConfirm: () => {
                    if (typeof config.onConfirm === 'function') config.onConfirm();
                    resolve({ isConfirmed: true });
                }
            });
        });
    }

    function showComponentMessage(config = {}) {
        const style = config.style || 'message';
        const type = config.type || 'error';
        const message = config.message || '';
        const title = config.title || '';
        const formValidation = Boolean(config.formValidation);

        if (style === 'toast') {
            showToast(type, message, title);
            return;
        }
        if (style === 'alert') {
            showAlert(type, message, title);
            return;
        }

        const el = resolveTargetElement(config.targetElement);
        if (!el) return;

        clearComponentMessage(el);

        el.dataset.componentMessage = message;
        el.dataset.componentMessageType = type;
        el.dataset.componentFormValidation = String(formValidation);

        if (type === 'error' || type === 'danger') {
            el.classList.add('is-invalid');
        }

        if (style === 'tooltip') {
            el.setAttribute('data-bs-toggle', 'tooltip');
            el.setAttribute('title', message);
            if (window.bootstrap && window.bootstrap.Tooltip) {
                new window.bootstrap.Tooltip(el).show();
            }
            return;
        }

        const feedback = document.createElement('div');
        const colorClass = (type === 'error' || type === 'danger') ? 'invalid-feedback d-block text-danger' : `text-${type} small mt-1`;
        feedback.className = `x-component-message ${colorClass}`;
        feedback.dataset.forValidation = String(formValidation);
        feedback.textContent = message;

        const wrapper = el.closest('.form-group, .mb-3, .x-form-component') || el.parentElement;
        if (wrapper) {
            wrapper.appendChild(feedback);
        } else {
            el.insertAdjacentElement('afterend', feedback);
        }
    }

    function hasComponentMessage(targetElement, type = null, formValidation = null) {
        const el = resolveTargetElement(targetElement);
        if (!el) return false;

        const msg = el.dataset.componentMessage || '';
        if (!msg.trim()) return false;

        if (type !== null && el.dataset.componentMessageType !== type) {
            return false;
        }
        if (formValidation !== null && el.dataset.componentFormValidation !== String(Boolean(formValidation))) {
            return false;
        }
        return true;
    }

    function clearComponentMessage(targetElement, formValidation = null) {
        const el = resolveTargetElement(targetElement);
        if (!el) return;

        if (formValidation !== null && el.dataset.componentFormValidation !== undefined) {
            if (el.dataset.componentFormValidation !== String(Boolean(formValidation))) {
                return;
            }
        }

        delete el.dataset.componentMessage;
        delete el.dataset.componentMessageType;
        delete el.dataset.componentFormValidation;
        el.classList.remove('is-invalid');

        const wrapper = el.closest('.form-group, .mb-3, .x-form-component') || el.parentElement;
        if (wrapper) {
            wrapper.querySelectorAll('.x-component-message').forEach(node => node.remove());
        }
    }

    function clearFormMessages(form) {
        const formEl = resolveTargetElement(form);
        if (!formEl) return;

        formEl.querySelectorAll('[data-component-message], .is-invalid').forEach(el => {
            clearComponentMessage(el);
        });
        formEl.querySelectorAll('.x-component-message').forEach(node => node.remove());
    }

    function toggleButtonLoading(target, isLoading, text = null) {
        const btn = resolveTargetElement(target);
        if (!btn) return;

        if (isLoading) {
            if (!btn.dataset.originalHtml) {
                btn.dataset.originalHtml = btn.innerHTML;
            }
            btn.disabled = true;
            const label = text !== null ? text : (btn.dataset.loadingText || 'در حال پردازش...');
            btn.innerHTML = `<span class="spinner-border spinner-border-sm ms-1" role="status" aria-hidden="true"></span> ${label}`;
        } else {
            if (btn.dataset.forceDisabled !== 'true') {
                btn.disabled = false;
            }
            if (btn.dataset.originalHtml) {
                btn.innerHTML = btn.dataset.originalHtml;
                delete btn.dataset.originalHtml;
            }
        }
    }

    function toggleFormElementLoading(target, isLoading) {
        const el = resolveTargetElement(target);
        if (!el) return;

        el.disabled = Boolean(isLoading);
        const wrapper = el.closest('.form-group, .mb-3, .x-form-component') || el.parentElement;
        if (!wrapper) return;

        const existingSpinner = wrapper.querySelector('.x-element-loading-spinner');
        if (isLoading && !existingSpinner) {
            const spinner = document.createElement('span');
            spinner.className = 'x-element-loading-spinner spinner-border spinner-border-sm text-primary position-absolute';
            spinner.style.left = '12px';
            spinner.style.top = '50%';
            wrapper.style.position = wrapper.style.position || 'relative';
            wrapper.appendChild(spinner);
        } else if (!isLoading && existingSpinner) {
            existingSpinner.remove();
        }
    }

    function toggleLoading(target, isLoading) {
        const container = resolveTargetElement(target);
        if (!container) return;

        const existing = container.querySelector(':scope > .x-container-loading-overlay');
        if (isLoading && !existing) {
            container.style.position = container.style.position || 'relative';
            const overlay = document.createElement('div');
            overlay.className = 'x-container-loading-overlay d-flex align-items-center justify-content-center position-absolute top-0 start-0 w-100 h-100 bg-white bg-opacity-75';
            overlay.style.zIndex = '1050';
            overlay.innerHTML = '<div class="spinner-border text-primary" role="status"></div>';
            container.appendChild(overlay);
        } else if (!isLoading && existing) {
            existing.remove();
        }
    }

    function validateForm(formSelector) {
        const form = resolveTargetElement(formSelector);
        if (!form) return false;
        if (window.jQuery && typeof window.jQuery(form).valid === 'function') {
            return window.jQuery(form).valid();
        }
        return typeof form.checkValidity === 'function' ? form.checkValidity() : true;
    }

    function validateField(fieldSelector) {
        const field = resolveTargetElement(fieldSelector);
        if (!field) return false;
        if (window.jQuery && typeof window.jQuery(field).valid === 'function') {
            return window.jQuery(field).valid();
        }
        return typeof field.checkValidity === 'function' ? field.checkValidity() : true;
    }

    function reinitializeFormValidation(formRequest, selector, options = {}) {
        const form = resolveTargetElement(selector);
        if (!form) return Promise.resolve(false);

        const submitBtn = form.querySelector('[type="submit"]');
        if (!options.background && submitBtn) {
            toggleButtonLoading(submitBtn, true);
        }

        form.dataset.formRequest = formRequest;

        const preserved = options.preservedErrors || {};
        Object.keys(preserved).forEach(field => {
            showComponentMessage({
                type: 'error',
                style: 'message',
                targetElement: form.querySelector(`[name="${field}"]`) || field,
                message: preserved[field],
                formValidation: true
            });
        });

        if (!options.background && submitBtn) {
            toggleButtonLoading(submitBtn, false);
        }

        return Promise.resolve(true);
    }

    function triggerOnChange(elementId, dependentElementIds = [], callback = null) {
        const el = resolveTargetElement(elementId);
        if (!el) return;

        el.addEventListener('change', function (event) {
            dependentElementIds.forEach(depId => {
                const dep = resolveTargetElement(depId);
                if (dep) {
                    dep.dispatchEvent(new Event('change', { bubbles: true }));
                    validateField(dep);
                }
            });
            if (typeof callback === 'function') {
                callback(event, el);
            }
        });
    }

    function addHiddenInputs(form, inputs = {}) {
        const formEl = resolveTargetElement(form);
        if (!formEl || !inputs) return;

        Object.keys(inputs).forEach(name => {
            let input = formEl.querySelector(`input[type="hidden"][name="${name}"]`);
            if (!input) {
                input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                formEl.appendChild(input);
            }
            input.value = inputs[name];
        });
    }

    function appendFilterQueryParamsToLinks(hashKey = 'xfg', containerSelector = '#theme_app_content') {
        const container = resolveTargetElement(containerSelector) || document;
        const params = new URLSearchParams(window.location.search);
        const val = params.get(hashKey);
        if (!val) return;

        container.querySelectorAll('a[href]').forEach(a => {
            const href = a.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
            try {
                const url = new URL(href, window.location.origin);
                if (url.origin === window.location.origin && !url.searchParams.has(hashKey)) {
                    url.searchParams.set(hashKey, val);
                    a.setAttribute('href', url.toString());
                }
            } catch (_) {
                // ignore malformed URLs
            }
        });
    }

    function downloadFile(url, filename = '') {
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error('خطا در دریافت فایل');
                return res.blob();
            })
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = filename || url.split('/').pop() || 'download';
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(blobUrl);
            })
            .catch(() => {
                showToast('error', 'امکان دانلود فایل وجود ندارد.');
            });
    }

    // --- Section G: Geolocation & Map Helpers ---

    function getDistanceBetweenPoints(p1, p2) {
        const R = 6371000; // Earth radius in meters
        const toRad = deg => (deg * Math.PI) / 180;
        const dLat = toRad(p2.lat - p1.lat);
        const dLng = toRad(p2.lng - p1.lng);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(p1.lat)) * Math.cos(toRad(p2.lat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c * 100) / 100;
    }

    function convertLatLngToUtm(point) {
        const lat = Number(point.lat);
        const lng = Number(point.lng);
        const a = 6378137.0;
        const eccSquared = 0.00669438;
        const k0 = 0.9996;

        const zoneNumber = Math.floor((lng + 180) / 6) + 1;
        const longOrigin = (zoneNumber - 1) * 6 - 180 + 3;
        const eccPrimeSquared = eccSquared / (1 - eccSquared);

        const latRad = (lat * Math.PI) / 180;
        const longRad = (lng * Math.PI) / 180;
        const longOriginRad = (longOrigin * Math.PI) / 180;

        const N = a / Math.sqrt(1 - eccSquared * Math.sin(latRad) * Math.sin(latRad));
        const T = Math.tan(latRad) * Math.tan(latRad);
        const C = eccPrimeSquared * Math.cos(latRad) * Math.cos(latRad);
        const A = Math.cos(latRad) * (longRad - longOriginRad);

        const M = a * (
            (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * Math.pow(eccSquared, 3) / 256) * latRad -
            (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * Math.pow(eccSquared, 3) / 1024) * Math.sin(2 * latRad) +
            (15 * eccSquared * eccSquared / 256 + 45 * Math.pow(eccSquared, 3) / 1024) * Math.sin(4 * latRad) -
            (35 * Math.pow(eccSquared, 3) / 3072) * Math.sin(6 * latRad)
        );

        const easting = k0 * N * (
            A + (1 - T + C) * Math.pow(A, 3) / 6 +
            (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * Math.pow(A, 5) / 120
        ) + 500000.0;

        let northing = k0 * (
            M + N * Math.tan(latRad) * (
                A * A / 2 + (5 - T + 9 * C + 4 * C * C) * Math.pow(A, 4) / 24 +
                (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * Math.pow(A, 6) / 720
            )
        );

        if (lat < 0) northing += 10000000.0;

        return {
            x: Math.round(easting * 100) / 100,
            y: Math.round(northing * 100) / 100,
            z: zoneNumber
        };
    }

    function convertUtmToLatLng(point) {
        const easting = Number(point.x);
        const northing = Number(point.y);
        const zoneNumber = Number(point.z);
        const k0 = 0.9996;
        const a = 6378137.0;
        const eccSquared = 0.00669438;
        const eccPrimeSquared = eccSquared / (1 - eccSquared);
        const e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));

        const x = easting - 500000.0;
        const y = northing;

        const longOrigin = (zoneNumber - 1) * 6 - 180 + 3;
        const M = y / k0;
        const mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * Math.pow(eccSquared, 3) / 256));

        const phi1Rad = mu +
            (3 * e1 / 2 - 27 * Math.pow(e1, 3) / 32) * Math.sin(2 * mu) +
            (21 * e1 * e1 / 16 - 55 * Math.pow(e1, 4) / 32) * Math.sin(4 * mu) +
            (151 * Math.pow(e1, 3) / 96) * Math.sin(6 * mu);

        const N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
        const T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
        const C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
        const R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
        const D = x / (N1 * k0);

        let lat = phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (
            D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * Math.pow(D, 4) / 24 +
            (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * Math.pow(D, 6) / 720
        );
        lat = (lat * 180) / Math.PI;

        let lng = (
            D - (1 + 2 * T1 + C1) * Math.pow(D, 3) / 6 +
            (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * Math.pow(D, 5) / 120
        ) / Math.cos(phi1Rad);
        lng = longOrigin + (lng * 180) / Math.PI;

        return {
            lat: Math.round(lat * 1000000) / 1000000,
            lng: Math.round(lng * 1000000) / 1000000
        };
    }

    function calculateArea(polygon = []) {
        if (!Array.isArray(polygon) || polygon.length < 3) return 0;
        const R = 6378137;
        let area = 0;
        for (let i = 0; i < polygon.length; i++) {
            const p1 = polygon[i];
            const p2 = polygon[(i + 1) % polygon.length];
            const x1 = (p1.lng * Math.PI) / 180;
            const y1 = (p1.lat * Math.PI) / 180;
            const x2 = (p2.lng * Math.PI) / 180;
            const y2 = (p2.lat * Math.PI) / 180;
            area += (x2 - x1) * (2 + Math.sin(y1) + Math.sin(y2));
        }
        return Math.round(Math.abs((area * R * R) / 2.0));
    }

    function calculateCentroid(polygon = []) {
        if (!Array.isArray(polygon) || polygon.length === 0) return { lat: 0, lng: 0 };
        if (polygon.length < 3) return calculateCenterOfMath(polygon);

        let twiceArea = 0;
        let latSum = 0;
        let lngSum = 0;

        for (let i = 0; i < polygon.length; i++) {
            const p1 = polygon[i];
            const p2 = polygon[(i + 1) % polygon.length];
            const cross = p1.lng * p2.lat - p2.lng * p1.lat;
            twiceArea += cross;
            latSum += (p1.lat + p2.lat) * cross;
            lngSum += (p1.lng + p2.lng) * cross;
        }

        if (Math.abs(twiceArea) < 1e-12) {
            return calculateCenterOfMath(polygon);
        }

        return {
            lat: Math.round((latSum / (3 * twiceArea)) * 1000000) / 1000000,
            lng: Math.round((lngSum / (3 * twiceArea)) * 1000000) / 1000000
        };
    }

    function calculateCenterOfMath(polygon = []) {
        if (!Array.isArray(polygon) || polygon.length === 0) return { lat: 0, lng: 0 };
        const sum = polygon.reduce((acc, p) => ({
            lat: acc.lat + Number(p.lat),
            lng: acc.lng + Number(p.lng)
        }), { lat: 0, lng: 0 });

        return {
            lat: Math.round((sum.lat / polygon.length) * 1000000) / 1000000,
            lng: Math.round((sum.lng / polygon.length) * 1000000) / 1000000
        };
    }

    // --- Section H: Media & Modal Helpers ---

    function getVideoThumbnail(videoSource, options = {}) {
        const time = options.time ?? 1;
        const width = options.width ?? 640;
        const height = options.height ?? 360;

        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.muted = true;
            video.playsInline = true;
            video.crossOrigin = 'anonymous';

            const isObjectUrl = videoSource instanceof Blob || videoSource instanceof File;
            video.src = isObjectUrl ? URL.createObjectURL(videoSource) : String(videoSource);

            video.onloadedmetadata = () => {
                video.currentTime = Math.min(time, video.duration || time);
            };

            video.onseeked = () => {
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, width, height);
                if (isObjectUrl) URL.revokeObjectURL(video.src);
                resolve(canvas.toDataURL('image/jpeg'));
            };

            video.onerror = err => {
                if (isObjectUrl) URL.revokeObjectURL(video.src);
                reject(err);
            };
        });
    }

    function setModalTitle(id, newTitle) {
        const modal = document.getElementById(id) || resolveTargetElement(id);
        if (!modal) return;
        const titleEl = modal.querySelector('[data-modal-title], .modal-title');
        if (titleEl) {
            titleEl.textContent = newTitle;
        }
    }

    // --- Section F: jQuery Prototype Extensions ---
    if (window.jQuery && window.jQuery.fn) {
        const $ = window.jQuery;

        $.fn.updateHint = function (text) {
            return this.each(function () {
                const wrapper = this.closest('.form-group, .mb-3, .x-form-component') || this.parentElement;
                const hintEl = wrapper?.querySelector('.form-text, [data-component-hint]');
                if (hintEl) hintEl.textContent = text;
            });
        };

        $.fn.updateLabel = function (text) {
            return this.each(function () {
                const wrapper = this.closest('.form-group, .mb-3, .x-form-component') || this.parentElement;
                const labelEl = wrapper?.querySelector('label, [data-component-label]');
                if (labelEl) labelEl.textContent = text;
            });
        };

        $.fn.disable = function () {
            return this.each(function () {
                this.disabled = true;
                this.setAttribute('data-force-disabled', 'true');
                this.classList.add('disabled');
            });
        };

        $.fn.enable = function () {
            return this.each(function () {
                this.disabled = false;
                this.removeAttribute('data-force-disabled');
                this.classList.remove('disabled');
            });
        };

        $.fn.getInstance = function () {
            const el = this[0];
            return el ? (el._coreInstance || null) : null;
        };

        $.fn.toggleConfirmation = function (state) {
            return this.each(function () {
                if (state) {
                    this.setAttribute('data-confirmation-enabled', 'true');
                } else {
                    this.setAttribute('data-confirmation-enabled', 'false');
                }
            });
        };

        $.fn.refreshComponent = function (resetParams = true) {
            return this.each(function () {
                const wireId = this.getAttribute('wire:id') || this.closest('[wire\\:id]')?.getAttribute('wire:id');
                if (wireId && window.Livewire) {
                    const comp = window.Livewire.find(wireId);
                    if (comp) {
                        if (resetParams && typeof comp.call === 'function') {
                            comp.$refresh();
                        } else {
                            comp.$refresh();
                        }
                    }
                }
            });
        };

        $.fn.setComponentParams = function (params = {}) {
            return this.each(function () {
                const existing = this.dataset.componentParams ? JSON.parse(this.dataset.componentParams) : {};
                this.dataset.componentParams = JSON.stringify(mergeRecursive(existing, params));
            });
        };
    }

    // Export functions to Core and window globals
    Object.assign(Core, {
        mergeRecursive,
        __,
        replacePersianDigits,
        convertAmountToText,
        getFormElementValueText,
        showAlert,
        showToast,
        showConfirmationMessage,
        showComponentMessage,
        hasComponentMessage,
        clearComponentMessage,
        clearFormMessages,
        reinitializeFormValidation,
        toggleButtonLoading,
        toggleFormElementLoading,
        toggleLoading,
        validateForm,
        validateField,
        triggerOnChange,
        addHiddenInputs,
        appendFilterQueryParamsToLinks,
        downloadFile,
        getDistanceBetweenPoints,
        convertUtmToLatLng,
        convertLatLngToUtm,
        calculateArea,
        calculateCentroid,
        calculateCenterOfMath,
        getVideoThumbnail,
        setModalTitle
    });

    Object.assign(window, {
        delay: Core.delay,
        debounce: Core.debounce,
        generateUUID: Core.generateUUID,
        mergeRecursive,
        __,
        replacePersianDigits,
        convertAmountToText,
        getFormElementValueText,
        showAlert,
        showToast,
        showConfirmationMessage,
        showComponentMessage,
        hasComponentMessage,
        clearComponentMessage,
        clearFormMessages,
        reinitializeFormValidation,
        toggleButtonLoading,
        toggleFormElementLoading,
        toggleLoading,
        validateForm,
        validateField,
        triggerOnChange,
        addHiddenInputs,
        appendFilterQueryParamsToLinks,
        downloadFile,
        getDistanceBetweenPoints,
        convertUtmToLatLng,
        convertLatLngToUtm,
        calculateArea,
        calculateCentroid,
        calculateCenterOfMath,
        getVideoThumbnail,
        setModalTitle
    });

    // Export Core globally (and aliases)
    window.Core = Core;
    window.core = Core;
    window.abolframe = Core;
    window.AbolFrame = Core;

})(window, document);
