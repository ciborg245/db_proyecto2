<template>
  <div class="field is-horizontal">
    <div class="field-label is-small">
      <label class="label">
        {{ label }}&nbsp;<sup v-if="isRequired"><a title="Campo requerido">*</a></sup>
      </label>
    </div>

    <div class="field-body">
      <div class="field has-addons">
        <div class="control flatpickr">
          <input type="text" data-input
                 :placeholder="placeHolder"
                 :value="date"
                 :disabled="isDisabled"
                 class="input"
                 :class="{ 'is-success': isSuccess, 'is-danger': isDanger }">&nbsp;
        </div>
        <a class="button input-button"
           :class="{ 'is-success': isSuccess, 'is-danger': isDanger }"
           :disabled="isDisabled"
           @click="openCalendar">
          <span class="icon"><i class="fa fa-calendar"></i></span>
        </a>

        <p class="help is-danger" v-if="isDanger">{{ errorMsg }}</p>

        <p class="help" v-if="showHelpMsg">{{ helpMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import loadash from 'lodash'
  import Flatpickr from 'flatpickr'
  import { Spanish } from 'flatpickr/dist/l10n/es.js'
  import moment from 'moment'

  export default {
    name: 'time-simple',

    props: {
      'label': {
        type: String,
        default: ''
      },
      'placeHolder': {
        type: String,
        default: ''
      },
      'value': {
        type: String
      },
      'isRequired': {
        type: Boolean,
        default: false
      },
      'isDisabled': {
        type: Boolean,
        default: false
      },
      'isSuccess': {
        type: Boolean,
        default: false
      },
      'isDanger': {
        type: Boolean,
        default: false
      },
      'errorMsg': {
        type: String,
        default: ''
      },
      'helpMsg': {
        type: String,
        default: ''
      },
      'config': {
        type: Object,
        default: () => ({})
      }
    },

    data () {
      return {
        datePicker: null,
        selectedDates: null,
        defaultConfig: {
          wrap: true,
          enableTime: true,
          noCalendar: false,
          locale: Spanish,
          altInput: true,
          altFormat: 'D d/M/Y',
          dateFormat: 'd m Y',
          defaultDate: [moment().format('D MM Y')]
        }
      }
    },

    computed: {
      date: {
        get () {
          return this.selectedDates || this.value
        },
        set (newValue) {
          if (this.selectedDates !== newValue) {
            this.selectedDates = newValue
            this.$emit('input', newValue)
          }
        }
      },

      showHelpMsg: function () {
        return (!this.isDanger && this.helpMsg.length > 0)
      }
    },

    methods: {
      redraw (newConfig) {
        this.datePicker.config = loadash.merge(this.datePicker.config, newConfig)
        this.datePicker.redraw()
        this.datePicker.jumpToDate()
      },

      setDate (newDate, oldDate) {
        if (newDate) {
          this.datePicker.setDate(newDate, true, '')
          this.datePicker.redraw()
          this.datePicker.jumpToDate()
        }
      },

      dateUpdated (selectedDates, dateStr) {
        this.date = dateStr
      },

      openCalendar () {
        this.datePicker.open()
      }
    },

    mounted: function () {
      if (!this.datePicker) {
        this.defaultConfig.onValueUpdate = this.dateUpdated
        this.datePicker = new Flatpickr(this.$el, loadash.merge(this.defaultConfig, this.config))
        this.setDate(this.value)
      }

      this.$watch('config', this.redraw)
      this.$watch('value', this.setDate)
    },

    beforeDestroy () {
      if (this.datePicker) {
        this.datePicker.destroy()
        this.datePicker = null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .flatpickr {
    flex-grow: 1;
  }

  .field.has-addons {
    flex-wrap: wrap;
  }

  .field .help {
    width: 100%;
  }
</style>
