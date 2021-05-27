import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.74.0/testing/asserts.ts";
import { readZip } from "./mod.ts";

Deno.test("can load an EPUB container file", async () => {
  const containerFileContent = await readZip("moby-dick.epub")
    .then((archive) => archive.file("META-INF/container.xml").async("string"));

  assert(containerFileContent.match(/full-path="OPS\/package.opf"/));
});

Deno.test("can load another EPUB container file", async () => {
  const containerFileContent = await readZip("cole-voyage-of-life.epub")
    .then((archive) => archive.file("META-INF/container.xml").async("string"));

  assert(containerFileContent.match(/full-path="EPUB\/cole.opf"/));
});

Deno.test("can load an EPUB media type", async () => {
  const containerFileContent = await readZip("page-blanche.epub")
    .then((archive) => archive.file("mimetype").async("string"));

  assertEquals(containerFileContent, "application/epub+zip");
});
