<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <p>{{ $t('confirmRemoveCity') }}</p>
      <button @click="confirm">Yes</button>
      <button @click="cancel">No</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  background-color: rgb(73, 140, 185);
  border-radius: 1rem;
}
.modal-content {
  text-align: center;
  color: var(--color-text);
}
button {
  margin: 10px;
}

@media (max-width: 600px) {
  .modal {
    width: 90%;
    padding: 15px;
  }

  .modal-content button {
    width: 100%;
    margin: 5px 0;
  }
}
</style>
