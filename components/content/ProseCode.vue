<template>
  <code class="prose-code">
    <slot/>
  </code>
</template>

<style>
.prose-code {
  background-color: #f6f8fa;
  color: #24292f;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  border: 1px solid #d1d9e0;
}
</style>