<template>
    <div>
        <div class="col-span-full flex items-center gap-x-8">
            <img
                :src="imageUrl"
                alt=""
                class="h-24 w-24 flex-none rounded-lg bg-white object-cover"
            />
            <div>
            <Field name="image" type="file">
                <button type="button" class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-white/20">
                    <label for="image">
                    Change Image
                    </label>
                </button>
                <input id="image" style="visibility:hidden;" type="file" @change="onChange">
            </Field>
            <ErrorMessage
                name="image"
                as="p"
                class="dark:text-pink-200 text-pink-400"
            />
            <p class="mt-2 text-xs leading-5 text-slate-400">
                JPG, GIF or PNG. 10MB max.
            </p>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useField, Field } from "vee-validate";

interface Props {
  imageUrl: string;
}

const props = defineProps<Props>();

const selectedImage = ref('');

const { handleChange } = useField("file")

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    // Convert the selected image to a data URL
    const reader = new FileReader();
    reader.onload = () => {
      selectedImage.value = reader.result as string;
    };
    reader.readAsDataURL(file);

    // Marks field as 'dirty'
    handleChange(event);
  }
}

const imageUrl = computed(() => selectedImage.value || props.imageUrl);

</script>
