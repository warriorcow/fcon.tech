import JustValidate, { Rules } from 'just-validate';

export const initCallbackForm = (): void => {
  const wrapperClass = '.callback';
  const formElClass = `${wrapperClass}__form`;
  const wrapperEl = document.querySelector<HTMLElement>(wrapperClass);
  const formEl = document.querySelector<HTMLFormElement>(formElClass);

  if (!formEl) return;

  const showThx = () => wrapperEl?.classList.add('success');

  const submitForm = async () => {
    const formData = new FormData(formEl);
    formData.append('action', 'sendform');

    try {
      const response = await fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

      formEl.reset();
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
    } finally {
      showThx();
    }
  };

  new JustValidate(formElClass, {
    errorLabelCssClass: 'el-input__error-message',
    errorFieldCssClass: 'invalid',
  })
    .addField('#name', [
      { rule: Rules.Required, errorMessage: 'Это поле не может быть пустым.' },
    ])
    .addField('#phone', [
      { rule: Rules.Required, errorMessage: 'Это поле не может быть пустым.' },
      { rule: Rules.CustomRegexp, value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, errorMessage: 'Некорректный номер телефона' },
    ])
    .addField('#email', [
      { rule: Rules.Required, errorMessage: 'Обязательное поле' },
      { rule: Rules.Email, errorMessage: 'Введите корректный email-адрес' },
    ])
    .addField('#policy', [
      { rule: Rules.Required, errorMessage: '' },
    ], {
      errorLabelStyle: { display: 'none' },
    })
    .onSuccess(submitForm);
};
