<script setup lang="ts">
  import { Button as AButton } from 'antdv-next'
</script>

<template>
  <a-image-preview-group>
    <a-image
      alt="svg image"
      :width="200"
      src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    />
    <a-image
      :width="200"
      alt="svg image"
      src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
    />
  </a-image-preview-group>
  <a-style-provider hash-priority="high">
    <a-button>
      click
      <StepForwardOutlined />
    </a-button>
  </a-style-provider>
</template>
