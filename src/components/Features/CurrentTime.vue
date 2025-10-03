<template>
  <div class="current-time-wrap">
    <span>{{formattedDateTime}}</span>
  </div>
</template>

<script>
export default {
  name: 'CurrentTime',
  data(){
    return{
      formattedDateTime: ''
    }
  },
  mounted(){
    //инициализация времени во время монтирования
    this.updateTime();
    //оновление каждую минуту (60000 мс) - this.interval не реактивная переменная, поэтому не обязательно указывать в data
    this.interval = setInterval(this.updateTime, 60000)
  },
  beforeUnmount() {
    //очистка интервала во время размонтирования
    if (this.interval){
      clearInterval(this.interval)
    }
  },
  methods: {
    updateTime(){
      const now = new Date();

      // Список дней недели на русском
      const daysOfWeek = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
      ]

      // Получение дня недели (0–6) - now.getDay() возвращает номер дня недели
      const dayName = daysOfWeek[now.getDay()]

      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); //месяцы идут от 0, поэтому прибавляем 1
      const year = now.getFullYear();
      const day = String(now.getDate()).padStart(2, '0');

      //сбор итоговой строки
      this.formattedDateTime = `${dayName} (${day}.${month}), ${hours}:${minutes}`;
    }
  }
}
</script>

<style lang="scss" scoped>
.current-time-wrap {
  margin: 0 auto;
  padding: 12px 16px;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: rgba(240, 242, 245, 0.7); /* Полупрозрачный светлый фон */
  backdrop-filter: blur(8px); /* Мягкое размытие */
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: inline-block;
  max-width: 350px;
  width: 100%;
  text-align: center;
  transition: 0.2s;

  span {
    font-size: 20px;
    font-weight: 600;
    color: #2c3e50;
    letter-spacing: -0.2px;
    transition: color 0.3s ease;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.85);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    transition: 0.3s;
  }
}
</style>