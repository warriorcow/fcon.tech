import Inputmask from "inputmask";

export const initInputs = () => {
  const phoneInputs = document.querySelectorAll<HTMLInputElement>('input[type="tel"]');

  phoneInputs.forEach((phoneInput) => {
    Inputmask({
      mask: "+7 (999) 999-99-99",
      showMaskOnHover: false,
      onBeforePaste: (pastedValue) => {

        if (pastedValue.startsWith("8")) {
          return pastedValue.replace(/^8/, "+7");
        }
        return pastedValue;
      },
      onBeforeMask: (value) => {

        if (value.startsWith("8")) {
          return value.replace(/^8/, "");
        }
        return value;
      }
    }).mask(phoneInput);


    phoneInput.addEventListener("input", () => {
      if (phoneInput.value === "8") {
        phoneInput.value = "";
      }
    });
  });
};

