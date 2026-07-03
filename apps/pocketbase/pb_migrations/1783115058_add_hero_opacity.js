/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1464924277");

  collection.fields.add(new NumberField({
    name: "hero_opacity",
    min: 0,
    max: 100
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1464924277");
  collection.fields.removeByName("hero_opacity");
  return app.save(collection);
})
