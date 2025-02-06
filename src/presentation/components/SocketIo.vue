<script setup lang="ts">
/* eslint-disable */
import {
  onMounted, inject, defineProps, defineEmits
} from 'vue';
import { SocketService } from '@/domain/services/SocketServices';
import { useUserStore } from '../store/UserStore';

const prop = defineProps({
  channel: {
    type: String,
    required: true
  }
})

const emit = defineEmits([ 'message' ])

// Inject SocketService
const socketService = inject<SocketService>('socketService');
// const socketService = new SocketService();
const userStore = useUserStore();
const { user } = userStore;

const handleMessage = (data: any) => {
  emit('message', data)
};

onMounted(() => {
  socketService?.on(prop.channel, handleMessage);
});


</script>
