export function marqueeLine() {
  document.addEventListener('DOMContentLoaded', () => {
    const marqueeLines: NodeListOf<HTMLElement> = document.querySelectorAll('.marquee-line');

    marqueeLines.forEach((marqueeLine: HTMLElement) => {
      const content: HTMLElement | null = marqueeLine.querySelector('.marquee-line__content');

      // Проверяем, что content существует
      if (!content) {
        console.error('Элемент .marquee-line__content не найден');
        return;
      }

      let items: NodeListOf<HTMLElement> = content.querySelectorAll('.marquee-line__item');

      // Клонируем элементы, пока их не станет 10
      while (items.length < 10) {
        items.forEach((item: HTMLElement) => {
          if (items.length < 10) { // Проверяем, чтобы не превысить 10 элементов
            const clone: Node = item.cloneNode(true); // Глубокое клонирование
            content.appendChild(clone);
          }
        });

        // Обновляем коллекцию items после добавления новых элементов
        items = content.querySelectorAll('.marquee-line__item');
      }

      // Клонируем .marquee-line__content два раза для бесконечной ленты
      const clone1: Node = content.cloneNode(true); // Первая копия
      const clone2: Node = content.cloneNode(true); // Вторая копия

      // Добавляем клонированные элементы в контейнер
      marqueeLine.appendChild(clone1);
      marqueeLine.appendChild(clone2);

      // Вычисляем общую ширину контента
      const contentWidth: number = content.scrollWidth; // Ширина всего контента

      // Устанавливаем длительность анимации
      const speed: number = 25; // Скорость в пикселях в секунду (можно настроить)
      const duration: number = contentWidth / speed; // Длительность анимации

      // Применяем длительность анимации
      (content as HTMLElement).style.animationDuration = `${duration}s`;
      (clone1 as HTMLElement).style.animationDuration = `${duration}s`;
      (clone2 as HTMLElement).style.animationDuration = `${duration}s`;
    });
  });
}
