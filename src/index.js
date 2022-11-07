import "core-js"
import "regenerator-runtime/runtime"

import SentryObject from "./sentry_object"
import { getSentryObjects } from "./sentry_service"

//Retorna o ID, Nome completo, ano inicio, ano maximo e adiciona no sentryObjects
async function loadSentryObjects() {
  let sentryObjects = []
  let sentryObjectsJSON = await getSentryObjects()
  sentryObjectsJSON.forEach(sentry => {
    const newSentry = new SentryObject(sentry["sentryId"], sentry["fullname"], sentry["year_range_min"], sentry["year_range_max"])
    sentryObjects.push(newSentry)
  })
  renderSentryObjects(sentryObjects)
}

//Cria uma lista ordenada onde concatena os dados id, name, yearMin e yearMax com a string para ser impresso na pagina web
function renderSentryObjects(sentryObjects) {
  const olElement = document.getElementById("sentry-objects")
  sentryObjects.forEach(sentry => {
    const liElement = document.createElement("li")
    const text = `O ID do objeto é:(${sentry.id}), o nome dele é: ${sentry.name}: risco de colisão esta entre o ano de ${sentry.yearMin} e ${sentry.yearMax}`
    liElement.innerText = text
    olElement.appendChild(liElement)
  })
}

loadSentryObjects()
