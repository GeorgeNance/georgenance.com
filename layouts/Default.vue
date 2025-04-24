<template>
  <div class="flex flex-col lg:flex-row col-2 min-h-screen gap-4 mx-auto w-full items-start  max-w-4xl">
    <div class="w-full lg:w-1/4">
      <AppNavbar />
    </div>
    <div class="w-full lg:w-3/4 flex flex-col justify-center pt-4 lg:pt-20 lg:pt-32">
      <NuxtPage />
    </div>
  </div>
</template>