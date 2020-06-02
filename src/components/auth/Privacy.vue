<template>
  <div v-html="$t('warning_template')" />
</template>

<script>
export default {
  name: 'Privacy',
};
</script>

<!-- eslint-disable max-len -->
<i18n locale="en" lang="yaml">
  warning_template: >-
    <div class="privacy-block">
      <div class="privacy-block__title">
        CONFIDENTIAL FORD MOTOR COMPANY<br>
      </div>
      <div class="privacy-block__wrapper">
        <div class="privacy-block__text">
          This is an unpublished work of authorship, which contains confidential information and/or trade secrets, created in 2015. Ford Motor Company owns all rights to this work and intends to maintain it in confidence to preserve its trade secret status. Ford Motor Company reserves all rights, under the copyright laws of the United States or those of any other country that may have jurisdiction, including the right to protect this work as an unpublished work, in the event of an inadvertent or deliberate unauthorized publication. Use of this work constitutes an agreement to maintain the confidentiality of the work, and to refrain from any reverse engineering, decompilation, or disassembly of this work.
        </div>
        <div class="privacy-block__text">
          Ford Motor Company also reserves its rights under all copyright laws to protect this work as a published work, when appropriate. Those having access to this work may not copy it, use it, modify it, or disclose the information contained in it without the written authorization of Ford Motor Company.
        </div>
        <div class="privacy-block__text">
          This work is licensed, not sold by Ford, and Ford has the right to terminate the license to use this work at any time and for any reason. All uses of this work are limited to the terms and conditions established by Ford. In the event of termination of the license to use this work, any physical media containing copies of this work or related materials shall be returned to Ford, and any electronic copies of this work or related materials shall be immediately and permanently erased.
        </div>
      </div>
    </div>
</i18n>

<i18n locale="ru" lang="yaml">
  warning_template: >-
    <div class="privacy-block">
      <div class="privacy-block__title">
        ПРЕДУПРЕЖДЕНИЕ!<br>
        ЭТО ЧАСТНАЯ КОМПЬЮТЕРНАЯ СИСТЕМА КОМПАНИИ ФОРД СОЛЛЕРС ХОЛДИНГ. ЗА ЕЕ ПОЛЬЗОВАНИЕМ ВЕДЕТСЯ НАБЛЮДЕНИЕ. НЕСАНКЦИОНИРОВАННЫЙ ДОСТУП МОЖЕТ ПРИВЕСТИ К УГОЛОВНОЙ ИЛИ ГРАЖДАНСКОЙ ОТВЕТСТЕННОСТИ, ПРИМЕНЕНИЮ ДИСЦИПЛИНАРНЫХ МЕР ВПЛОТЬ ДО И ВКЛЮЧАЯ УВОЛЬНЕНИЕ, РАСТОРЖЕНИЕ ДОГОВОРА ИЛИ ЗАПРЕТ К ДОСТУПУ СИСТЕМЫ.
      </div>
      <div class="privacy-block__wrapper">
        <div class="privacy-block__text">
          Регистрируясь в этой системе, я соглашаюсь, что, когда это предусмотрено соответствующим законодательством: 1) пользуясь этой системой, я отказываюсь от конфиденциальности; 2) компания Форд Соллерс имеет право на коллекционирование и обработку моего имени, фамилии и деловой контактной информации, хранить их в базах даных, находящихся в Российской Федерации, и передавать их как в пределах компании Форд Соллерс Холдинг так и ее глобальным аффилированным компаниям (включая аффилированные компании, перечисленные в самой последней Форме 10-К SEC [Комиссии США по ценным бумагам и биржам]) и их провайдерами сервиса в интересах моих деловых отношений или договоренностей с компанией Форд Соллерс Холдинг; 3) компания Форд Соллерс Холдинг ведет активный мониторинг своей информации, систем и данных с целью идентификации принятия мер по защите от угрозы безопасности и потери данных, и любая информация или данные, идентифицированные в таком мониторинге, могут совместно использоваться компанией Форд Соллерс Холдинг, ее филиалами и глобальными аффилированными компаниями и провайдерами сервиса, и предоставляться органам власти (включая правоохранительные органы); и 4) я понимаю и буду соблюдать пол ожения Директивы В-109 компании Ford и другие перечисленные ниже правила политики конфиденциальности. Компания Форд Соллерс Холдинг принимает во внимание, что в определенных юрисдикциях существуют специфические законы, постановления и трудовые соглашения и компания Форд Соллерс Холдинг обязуется их соблюдать.
        </div>
        <div class="privacy-block__text">
          Входя в эту систему, я подтверждаю, что она является конфиденциальной и запатентованной для компании Форд Соллерс Холдинг, ее аффилированных компаний, дилеров и поставщиков, что я отвечаю за поддержание безопасности и конфиденциальности информации и что я буду использовать ее только для целей, разрешенных компанией Форд Соллерс Холдинг. Эта информация не должна разглашаться и не подлежит разглашению без надлежащего разрешения, данного компанией Форд Соллерс Холдинг. Компания Форд Соллерс Холдинг владеет всеми правами на неопубликованные работы, созданныe компанией Форд Соллерс Холдинг или разработанныe для нее, и сохраняет за собой право в случае их непреднамеренного или преднамеренного несанкционированного опубликования защищать свои авторские права на эти работы. Компания Форд Соллерс Холдинг также сохраняет за собой права согласно законодательству об авторском праве защищать такие работы как опубликованные работы. Я соглашаюсь прочитать и соблюдать Политику №22, Директивы В-109 и С-110 и Глобальный информационный Стандарт 2 [Global Information Standard 2 (GIS2)] компании Ford, прежде чем получить доступ к информации в Интернете.
        </div>
      </div>
    </div>
</i18n>
<!-- esling-enable max-len -->
