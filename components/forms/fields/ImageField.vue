<template>
  <div>
    <div class="col-span-full flex items-center gap-x-8">
      <img
        :src="imageUrl"
        alt=""
        class="h-24 w-24 flex-none rounded-lg bg-white object-cover"
      />
      <div>
        <Field name="file" type="file">
          <BaseButton
            :button-theme="themeButtonService.getThemeButtonById(4)"
            class="font-bold"
            type="button"
          >
            <label for="file">{{ $t("global.fields.change_image") }}</label>
          </BaseButton>
          <input
            id="file"
            style="visibility: hidden"
            type="file"
            accept="image/jpeg,image/png,image/gif"
            @change="onChange"
          />
        </Field>
        <ErrorMessage
          name="file"
          as="p"
          class="dark:text-pink-200 text-pink-400"
        />
        <p class="mt-2 text-xs leading-5 text-slate-400">
          {{ $t("global.fields.image_size") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField, Field } from "vee-validate";
import { themeButtonService } from "~/services/theme/ThemeButtonService";

interface Props {
  imageUrl: string;
}

const props = defineProps<Props>();

const selectedImage = ref("");

const { handleChange } = useField("file");

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
