<template lang="html">
  <input type="text" name="" value="" style="display:none">
</template>

<script>
import Flatpickr from 'flatpickr'
import esp from 'flatpickr/dist/l10n/es'

let datepicker;

export default {
  data () {
    return {}
  },
  computed: {},
  mounted () {
    const self = this
    datepicker = new Flatpickr (this.$el, {
      inline:true,
      locale: esp.es,
      disable: [
        { from: 'today'},
      ],
      onChange: self.dateSelected
    })
  },
  beforeDestroy() {
    datepicker.destroy()
  },
  methods: {
    dateSelected(selectedDates) {
      this.$emit('dateSelected', selectedDates[0])
    }
  },
  components: {}
}
</script>

<style lang="css">
.flatpickr-calendar {
  font-size: 16px;
}
.flatpickr-rContainer, .flatpickr-days, .flatpickr-calendar {
  width: 100% !important;
}

.flatpickr-weekdays {
  padding-top: 10px;
}
.flatpickr-days {
  background: white;
}
.flatpickr-day {
  max-width: none;
  height: 60px;
  line-height: 60px;
  font-weight: bold;
}
.flatpickr-month {
  height: 40px;
  line-height: 40px;
}

.flatpickr-month {
  color: white;
}
.flatpickr-weekdays, .flatpickr-month {
  background-color: #569ff7;
  border: 1px solid #569ff7;
}

.flatpickr-prev-month svg, .flatpickr-next-month svg {
    width: 23px;
}
</style>
