import { component$ } from "@builder.io/qwik"
import type { DocumentHead } from "@builder.io/qwik-city"

import Hero from "~/components/starter/hero/hero"

export default component$(() => {
  return (
    <>
      <Hero />
    </>
  )
})

export const head: DocumentHead = {
  title: "Sunny Pass - แคล้วคลาดพ้นภัย",
  meta: [
    {
      name: "description",
      content: "Sunny Pass - แคล้วคลาดพ้นภัย",
    },
  ],
}
