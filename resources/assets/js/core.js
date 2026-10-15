/**
 * Core Laravel UI JavaScript Controller Library
 * Full Component Controllers, Utilities, and Lifecycle Events
 */

(function (window, document) {
    'use strict';

    const core = {
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

        debounce: function (fn, ms) {
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

        toPersianDigits: function (str) {
            if (str === null || str === undefined) return '';
            const farsi = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            return String(str).replace(/[0-9]/g, w => farsi[+w]);
        },

        toEnglishDigits: function (str) {
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

        formatMoney: function (amount, unit = 'تومان', persianDigits = true) {
            const raw = core.toEnglishDigits(amount).replace(/[^0-9.-]/g, '');
            if (!raw) return '';
            const parts = Number(raw).toLocaleString('en-US');
            const res = persianDigits ? core.toPersianDigits(parts) : parts;
            return unit ? `${res} ${unit}` : res;
        },

        // Modal API
        modal: {
            open: function (id) {
                const cleanId = id.replace(/^#/, '');
                const el = document.getElementById(cleanId);
                if (el && window.bootstrap && window.bootstrap.Modal) {
                    const inst = window.bootstrap.Modal.getOrCreateInstance(el);
                    inst.show();
                }
            },
            close: function (id) {
                const cleanId = id.replace(/^#/, '');
                const el = document.getElementById(cleanId);
                if (el && window.bootstrap && window.bootstrap.Modal) {
                    const inst = window.bootstrap.Modal.getInstance(el);
                    if (inst) inst.hide();
                }
            },
            on: function (event, id, callback) {
                const cleanId = id.replace(/^#/, '');
                const el = document.getElementById(cleanId);
                if (el) {
                    el.addEventListener(`${event}.bs.modal`, callback);
                }
            }
        }
    };

    // -------------------------------------------------------------
    // Number Input Controller
    // -------------------------------------------------------------
    class NumberInputController {
        constructor(element) {
            this.input = element;
            this.container = element.closest('.core-number-group');
            this.min = element.dataset.min ? Number(element.dataset.min) : null;
            this.max = element.dataset.max ? Number(element.dataset.max) : null;
            this.step = Number(element.dataset.step) || 1;
            this.thousandSeparator = element.dataset.thousandSeparator === 'true';
            this.persianDigits = element.dataset.persianDigits === 'true';

            this.init();
        }

        init() {
            if (this.container) {
                const btnDec = this.container.querySelector('.btn-decrement');
                const btnInc = this.container.querySelector('.btn-increment');

                if (btnDec) {
                    btnDec.addEventListener('click', () => this.stepBy(-this.step));
                }
                if (btnInc) {
                    btnInc.addEventListener('click', () => this.stepBy(this.step));
                }
            }

            this.input.addEventListener('input', () => this.formatValue());
            this.formatValue();
        }

        stepBy(amount) {
            let current = Number(core.toEnglishDigits(this.input.value).replace(/[^0-9.-]/g, '')) || 0;
            current += amount;

            if (this.min !== null && current < this.min) current = this.min;
            if (this.max !== null && current > this.max) current = this.max;

            this.input.value = current;
            this.formatValue();

            this.input.dispatchEvent(new CustomEvent('number:change', {
                detail: { name: this.input.name, value: current },
                bubbles: true
            }));
        }

        formatValue() {
            let raw = core.toEnglishDigits(this.input.value).replace(/[^0-9.-]/g, '');
            if (!raw) return;

            if (this.thousandSeparator && !isNaN(raw)) {
                let formatted = Number(raw).toLocaleString('en-US');
                if (this.persianDigits) {
                    formatted = core.toPersianDigits(formatted);
                }
                this.input.value = formatted;
            }
        }
    }

    // -------------------------------------------------------------
    // Textarea Controller (Auto Resize & Counter)
    // -------------------------------------------------------------
    class TextareaController {
        constructor(element) {
            this.textarea = element;
            this.counter = document.getElementById(`${element.id}_counter`);
            this.maxlength = element.getAttribute('maxlength') ? Number(element.getAttribute('maxlength')) : null;
            this.autoResize = element.dataset.autoResize === 'true';

            this.init();
        }

        init() {
            this.textarea.addEventListener('input', () => {
                this.updateCounter();
                if (this.autoResize) this.resize();
            });

            this.updateCounter();
            if (this.autoResize) this.resize();
        }

        updateCounter() {
            if (this.counter && this.maxlength) {
                const countEl = this.counter.querySelector('.current-count');
                const len = this.textarea.value.length;
                if (countEl) countEl.textContent = core.toPersianDigits(len);
            }
        }

        resize() {
            this.textarea.style.height = 'auto';
            this.textarea.style.height = (this.textarea.scrollHeight + 4) + 'px';
        }
    }

    // -------------------------------------------------------------
    // Select Input Controller (Dependent Select & Events)
    // -------------------------------------------------------------
    class SelectInputController {
        constructor(element) {
            this.select = element;
            this.parentField = element.dataset.parentField;
            this.parentRoute = element.dataset.parentRoute;
            this.ajaxRoute = element.dataset.ajaxRoute;

            this.init();
        }

        init() {
            this.select.addEventListener('change', () => {
                this.select.dispatchEvent(new CustomEvent('select:change', {
                    detail: {
                        name: this.select.name,
                        value: this.select.value,
                        text: this.select.options[this.select.selectedIndex]?.text
                    },
                    bubbles: true
                }));
            });

            if (this.parentField && this.parentRoute) {
                const parentEl = document.querySelector(`[name="${this.parentField}"]`);
                if (parentEl) {
                    parentEl.addEventListener('change', () => this.loadChildren(parentEl.value));
                }
            }
        }

        async loadChildren(parentId) {
            if (!parentId) {
                this.select.innerHTML = '<option value="">انتخاب کنید</option>';
                return;
            }

            try {
                this.select.disabled = true;
                const url = new URL(this.parentRoute, window.location.origin);
                url.searchParams.append('parent_id', parentId);

                const response = await fetch(url);
                const items = await response.json();

                this.select.innerHTML = '<option value="">انتخاب کنید</option>';
                items.forEach(item => {
                    const opt = document.createElement('option');
                    opt.value = item.id;
                    opt.textContent = item.title || item.name;
                    this.select.appendChild(opt);
                });
            } catch (err) {
                console.error('[SelectController] Failed to load dependent options', err);
            } finally {
                this.select.disabled = false;
            }
        }
    }

    // -------------------------------------------------------------
    // Editor Controller
    // -------------------------------------------------------------
    class EditorController {
        constructor(wrapper) {
            this.wrapper = wrapper;
            this.toolbar = wrapper.querySelector('.core-editor-toolbar');
            this.content = wrapper.querySelector('.core-editor-content');
            this.hidden = wrapper.querySelector('textarea');

            this.init();
        }

        init() {
            if (!this.content || !this.toolbar) return;

            this.toolbar.querySelectorAll('[data-command]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const cmd = btn.dataset.command;

                    if (cmd === 'createLink') {
                        const url = prompt('آدرس اینترنتی لینک را وارد نمایید:');
                        if (url) document.execCommand(cmd, false, url);
                    } else if (cmd === 'insertImage') {
                        const url = prompt('آدرس اینترنتی تصویر را وارد نمایید:');
                        if (url) document.execCommand('insertImage', false, url);
                    } else {
                        document.execCommand(cmd, false, null);
                    }
                    this.sync();
                });
            });

            this.content.addEventListener('input', () => this.sync());
        }

        sync() {
            if (this.hidden) {
                this.hidden.value = this.content.innerHTML;
            }
        }
    }

    // -------------------------------------------------------------
    // Item Collector Controller
    // -------------------------------------------------------------
    class ItemCollectorController {
        constructor(wrapper) {
            this.wrapper = wrapper;
            this.container = wrapper.querySelector('.core-item-collector-container');
            this.addBtn = wrapper.querySelector('.btn-add-row');
            this.template = wrapper.querySelector('template');

            this.init();
        }

        init() {
            if (this.addBtn && this.template && this.container) {
                this.addBtn.addEventListener('click', () => this.addRow());
            }

            this.wrapper.addEventListener('click', (e) => {
                const removeBtn = e.target.closest('.btn-remove-row');
                if (removeBtn) {
                    const row = removeBtn.closest('.collector-row');
                    if (row) row.remove();
                }
            });
        }

        addRow() {
            const index = this.container.children.length;
            const html = this.template.innerHTML.replace(/__INDEX__/g, index);
            const temp = document.createElement('div');
            temp.innerHTML = html;
            this.container.appendChild(temp.firstElementChild);
        }
    }

    // -------------------------------------------------------------
    // Tag Collector Controller (Key/Value Metadata)
    // -------------------------------------------------------------
    class TagCollectorController {
        constructor(wrapper) {
            this.wrapper = wrapper;
            this.rowsContainer = wrapper.querySelector('.tag-collector-rows');
            this.addBtn = wrapper.querySelector('.btn-add-tag');
            this.template = wrapper.querySelector('template');

            this.init();
        }

        init() {
            if (this.addBtn && this.template && this.rowsContainer) {
                this.addBtn.addEventListener('click', () => {
                    const index = this.rowsContainer.children.length;
                    const html = this.template.innerHTML.replace(/__INDEX__/g, index);
                    const temp = document.createElement('div');
                    temp.innerHTML = html;
                    this.rowsContainer.appendChild(temp.firstElementChild);
                });
            }

            this.wrapper.addEventListener('click', (e) => {
                const btn = e.target.closest('.btn-remove-tag');
                if (btn) {
                    btn.closest('.tag-row')?.remove();
                }
            });
        }
    }

    // -------------------------------------------------------------
    // Tag Input Controller
    // -------------------------------------------------------------
    class TagInputController {
        constructor(container) {
            this.container = container;
            this.textInput = container.querySelector('.tag-text-input');
            this.badgeWrapper = container.querySelector('.tags-badge-wrapper');
            this.hiddenInput = container.querySelector('input[type="hidden"]');
            this.separator = container.dataset.separator || ',';
            this.maxTags = container.dataset.maxTags ? Number(container.dataset.maxTags) : null;

            this.init();
        }

        init() {
            if (!this.textInput || !this.hiddenInput) return;

            this.textInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    this.addTag(this.textInput.value.trim());
                    this.textInput.value = '';
                }
            });

            this.badgeWrapper.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-remove-single-tag')) {
                    e.target.closest('.badge')?.remove();
                    this.sync();
                }
            });
        }

        addTag(text) {
            if (!text) return;
            const currentCount = this.badgeWrapper.querySelectorAll('.badge').length;
            if (this.maxTags && currentCount >= this.maxTags) return;

            const badge = document.createElement('span');
            badge.className = 'badge bg-primary d-inline-flex align-items-center gap-1 py-1 px-2';
            badge.innerHTML = `<span>${text}</span><i class="fa fa-times cursor-pointer btn-remove-single-tag" style="font-size: 0.75rem;"></i>`;
            this.badgeWrapper.appendChild(badge);
            this.sync();
        }

        sync() {
            const tags = Array.from(this.badgeWrapper.querySelectorAll('.badge span')).map(s => s.textContent);
            this.hiddenInput.value = tags.join(this.separator);
        }
    }

    // -------------------------------------------------------------
    // File Picker Controller
    // -------------------------------------------------------------
    class FilePickerController {
        constructor(wrapper) {
            this.wrapper = wrapper;
            this.input = wrapper.querySelector('.core-file-input');
            this.previewContainer = wrapper.querySelector('.file-picker-preview-container');
            this.maxSize = Number(wrapper.dataset.maxSize) || 10240;

            this.init();
        }

        init() {
            if (!this.input) return;

            ['dragenter', 'dragover'].forEach(name => {
                this.wrapper.addEventListener(name, (e) => {
                    e.preventDefault();
                    this.wrapper.classList.add('dragover');
                });
            });

            ['dragleave', 'drop'].forEach(name => {
                this.wrapper.addEventListener(name, (e) => {
                    e.preventDefault();
                    this.wrapper.classList.remove('dragover');
                });
            });

            this.input.addEventListener('change', () => this.handleFiles(this.input.files));
        }

        handleFiles(files) {
            if (!files || !this.previewContainer) return;

            this.previewContainer.innerHTML = '';
            Array.from(files).forEach(file => {
                if (file.size > this.maxSize * 1024) {
                    alert(`حجم فایل "${file.name}" بیشتر از حد مجاز است!`);
                    return;
                }

                const item = document.createElement('div');
                item.className = 'file-preview-item position-relative border rounded p-2 bg-white shadow-sm d-flex align-items-center gap-2';

                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        item.innerHTML = `<img src="${e.target.result}" style="width: 32px; height: 32px; object-fit: cover;" class="rounded"><span class="small text-truncate" style="max-width: 150px;">${file.name}</span>`;
                    };
                    reader.readAsDataURL(file);
                } else {
                    item.innerHTML = `<i class="fa fa-file-alt text-primary"></i><span class="small text-truncate" style="max-width: 150px;">${file.name}</span>`;
                }

                this.previewContainer.appendChild(item);
            });
        }
    }

    // -------------------------------------------------------------
    // Global Auto Initializer
    // -------------------------------------------------------------
    function initAll() {
        // Number Inputs
        document.querySelectorAll('[data-component="number-input"]').forEach(el => new NumberInputController(el));

        // Textareas
        document.querySelectorAll('textarea[data-component="textarea"]').forEach(el => new TextareaController(el));

        // Select Inputs
        document.querySelectorAll('select[data-component="select-input"]').forEach(el => new SelectInputController(el));

        // Editors
        document.querySelectorAll('[data-component="editor"]').forEach(el => new EditorController(el));

        // Item Collectors
        document.querySelectorAll('[data-component="item-collector"]').forEach(el => new ItemCollectorController(el));

        // Tag Collectors
        document.querySelectorAll('[data-component="tag-collector"]').forEach(el => new TagCollectorController(el));

        // Tag Inputs
        document.querySelectorAll('[data-component="tag-input"]').forEach(el => new TagInputController(el));

        // File Pickers
        document.querySelectorAll('[data-component="file-picker"]').forEach(el => new FilePickerController(el));

        // Checkbox Group Select All
        document.querySelectorAll('.btn-select-all').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = document.getElementById(btn.dataset.target);
                if (target) {
                    const checkboxes = target.querySelectorAll('input[type="checkbox"]');
                    const allChecked = Array.from(checkboxes).every(c => c.checked);
                    checkboxes.forEach(c => c.checked = !allChecked);
                }
            });
        });

        // Confirm buttons
        document.querySelectorAll('[data-confirm]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const message = btn.dataset.confirm || 'آیا از انجام این عملیات اطمینان دارید؟';
                if (!confirm(message)) {
                    e.preventDefault();
                }
            });
        });

        // Initialize Bootstrap tooltips if available
        if (window.bootstrap && window.bootstrap.Tooltip) {
            document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new window.bootstrap.Tooltip(el));
        }
    }

    core.initAll = initAll;
    core.ready(initAll);

    // Export core and doravel aliases
    window.core = core;
    window.doravel = core;

})(window, document);
