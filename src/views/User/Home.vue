<template>
  <main class="container mx-auto py-5">
    <section class="grid grid-cols-2">
      <div class="flex flex-col justify-center gap-4">
        <h1 class="text-4xl font-bold">Everiyn</h1>
        <p>
          我們以雙手雕琢每一枚婚戒與飾品，用時間與溫度，將故事注入金屬之中。
          從設計到完成，Everiyn
          堅持手工製作，讓愛的印記，不只是戴在指間，更銘刻在心中。
          這不只是一枚戒指，而是屬於你們之間的約定 —— 專屬、恆久、無可取代。
        </p>
      </div>
      <div class="rounded-lg overflow-hidden">
        <img src="@/assets/images/banner.jpg" alt="home" />
      </div>
    </section>

    <section class="py-10">
      <h2 class="text-3xl font-bold text-center text-secondary mb-1">
        熱銷商品
      </h2>
      <div class="border-b-4 border-secondary w-[11%] mx-auto mb-4"></div>
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-base-100 shadow-sm rounded-md bg-white">
          <figure>
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/everlynapi/1751006072163.jpg"
              alt="心鑽 True Spark"
              class="rounded-t-md mb-2"
            />
          </figure>
          <div class="p-2 flex flex-col gap-4 mb-2">
            <h2 class="text-2xl">心鑽 True Spark</h2>
            <p class="text-lg">
              為你，將一顆真心托起。 在時間之上，在承諾之下，
              每一道光芒，都只為你閃耀。
            </p>
            <div class="flex item-center justify-between">
              <p class="text-2xl text-cyan-600 font-bold">NT$32800</p>
            </div>
          </div>
        </div>
        <div class="bg-base-100 shadow-sm rounded-md bg-white">
          <figure>
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/everlynapi/1750835482622.jpg"
              alt="心月 · Lunara"
              class="rounded-t-md mb-2"
            />
          </figure>
          <div class="p-2 flex flex-col gap-4 mb-2">
            <h2 class="text-2xl">心月 · Lunara</h2>
            <p class="text-lg">
              愛情的光，彷彿月色般溫柔而堅定。
              緊扣雙手，是一場關於心意與永恆的承諾。
              用最純淨的閃耀，見證你們的「我願意」。
            </p>
            <div class="flex item-center justify-between">
              <p class="text-2xl text-cyan-600 font-bold">NT$22800</p>
            </div>
          </div>
        </div>
        <div class="bg-base-100 shadow-sm rounded-md bg-white">
          <figure>
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/everlynapi/1751005806863.jpg"
              alt="恆定 Everstead"
              class="rounded-t-md mb-2"
            />
          </figure>
          <div class="p-2 flex flex-col gap-4 mb-2">
            <h2 class="text-2xl">恆定 Everstead</h2>
            <p class="text-lg">
              愛不是瞬間的悸動，而是日復一日的堅守與溫柔。
              在歲月流轉裡，我們始終如一。 因為愛你，是我最恆久不變的選擇。
            </p>
            <div class="flex item-center justify-between">
              <p class="text-2xl text-cyan-600 font-bold">NT$39800</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
