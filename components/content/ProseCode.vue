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
  <code class="prose-code bg-gray-50 text-gray-800 border border-gray-200 rounded px-1.5 py-0.5 text-sm">
    <slot/>
  </code>
</template>

<style>
.prose-code {
  font-size: 0.9em;
  font-family: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
}
</style>