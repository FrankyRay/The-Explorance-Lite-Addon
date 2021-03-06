import {
  world as e,
  ItemStack as t,
  MinecraftItemTypes as i,
  Player as r,
} from "mojang-minecraft";
import {
  players as s,
  whitelist as o,
  devBuild as n,
  addon_prefix as p,
} from "scripts/credentials/access.js";
import { client as l } from "scripts/gametests/commands/message.js";
import { codeExecute as a } from "./javascript.js";
import c from "scripts/typescript/typescript.js";
import { lib_d_ts as d } from "scripts/typescript/lib.d.js";
import { lib_dom_d_ts as m } from "scripts/typescript/lib.dom.d.js";
import { lib_dom_iterable_d_ts as y } from "scripts/typescript/lib.dom.iterable.d.js";
import { lib_es2015_collection_d_ts as b } from "scripts/typescript/lib.es2015.collection.d.js";
import { lib_es2015_core_d_ts as f } from "scripts/typescript/lib.es2015.core.d.js";
import { lib_es2015_d_ts as u } from "scripts/typescript/lib.es2015.d.js";
import { lib_es2015_generator_d_ts as S } from "scripts/typescript/lib.es2015.generator.d.js";
import { lib_es2015_iterable_d_ts as g } from "scripts/typescript/lib.es2015.iterable.d.js";
import { lib_es2015_promise_d_ts as w } from "scripts/typescript/lib.es2015.promise.d.js";
import { lib_es2015_proxy_d_ts as E } from "scripts/typescript/lib.es2015.proxy.d.js";
import { lib_es2015_reflect_d_ts as k } from "scripts/typescript/lib.es2015.reflect.d.js";
import { lib_es2015_symbol_d_ts as h } from "scripts/typescript/lib.es2015.symbol.d.js";
import { lib_es2015_symbol_wellknown_d_ts as j } from "scripts/typescript/lib.es2015.symbol.wellknown.d.js";
import { lib_es2016_array_include_d_ts as D } from "scripts/typescript/lib.es2016.array.include.d.js";
import { lib_es2016_d_ts as x } from "scripts/typescript/lib.es2016.d.js";
import { lib_es2016_full_d_ts as O } from "scripts/typescript/lib.es2016.full.d.js";
import { lib_es2017_d_ts as v } from "scripts/typescript/lib.es2017.d.js";
import { lib_es2017_full_d_ts as C } from "scripts/typescript/lib.es2017.full.d.js";
import { lib_es2017_intl_d_ts as I } from "scripts/typescript/lib.es2017.intl.d.js";
import { lib_es2017_object_d_ts as F } from "scripts/typescript/lib.es2017.object.d.js";
import { lib_es2017_sharedmemory_d_ts as N } from "scripts/typescript/lib.es2017.sharedmemory.d.js";
import { lib_es2017_string_d_ts as $ } from "scripts/typescript/lib.es2017.string.d.js";
import { lib_es2017_typedarrays_d_ts as T } from "scripts/typescript/lib.es2017.typedarrays.d.js";
import { lib_es2018_asyncgenerator_d_ts as P } from "scripts/typescript/lib.es2018.asyncgenerator.d.js";
import { lib_es2018_asynciterable_d_ts as M } from "scripts/typescript/lib.es2018.asynciterable.d.js";
import { lib_es2018_d_ts as A } from "scripts/typescript/lib.es2018.d.js";
import { lib_es2018_full_d_ts as V } from "scripts/typescript/lib.es2018.full.d.js";
import { lib_es2018_intl_d_ts as J } from "scripts/typescript/lib.es2018.intl.d.js";
import { lib_es2018_promise_d_ts as U } from "scripts/typescript/lib.es2018.promise.d.js";
import { lib_es2018_regexp_d_ts as R } from "scripts/typescript/lib.es2018.regexp.d.js";
import { lib_es2019_array_d_ts as L } from "scripts/typescript/lib.es2019.array.d.js";
import { lib_es2019_d_ts as W } from "scripts/typescript/lib.es2019.d.js";
import { lib_es2019_full_d_ts as B } from "scripts/typescript/lib.es2019.full.d.js";
import { lib_es2019_object_d_ts as z } from "scripts/typescript/lib.es2019.object.d.js";
import { lib_es2019_string_d_ts as G } from "scripts/typescript/lib.es2019.string.d.js";
import { lib_es2019_symbol_d_ts as Y } from "scripts/typescript/lib.es2019.symbol.d.js";
import { lib_es2020_bigint_d_ts as _ } from "scripts/typescript/lib.es2020.bigint.d.js";
import { lib_es2020_d_ts as q } from "scripts/typescript/lib.es2020.d.js";
import { lib_es2020_full_d_ts as H } from "scripts/typescript/lib.es2020.full.d.js";
import { lib_es2020_intl_d_ts as K } from "scripts/typescript/lib.es2020.intl.d.js";
import { lib_es2020_promise_d_ts as Q } from "scripts/typescript/lib.es2020.promise.d.js";
import { lib_es2020_sharedmemory_d_ts as X } from "scripts/typescript/lib.es2020.sharedmemory.d.js";
import { lib_es2020_string_d_ts as Z } from "scripts/typescript/lib.es2020.string.d.js";
import { lib_es2020_symbol_wellknown_d_ts as ee } from "scripts/typescript/lib.es2020.symbol.wellknown.d.js";
import { lib_es2021_d_ts as te } from "scripts/typescript/lib.es2021.d.js";
import { lib_es2021_full_d_ts as ie } from "scripts/typescript/lib.es2021.full.d.js";
import { lib_es2021_intl_d_ts as re } from "scripts/typescript/lib.es2021.intl.d.js";
import { lib_es2021_promise_d_ts as se } from "scripts/typescript/lib.es2021.promise.d.js";
import { lib_es2021_string_d_ts as oe } from "scripts/typescript/lib.es2021.string.d.js";
import { lib_es2021_weakref_d_ts as ne } from "scripts/typescript/lib.es2021.weakref.d.js";
import { lib_es2022_array_d_ts as pe } from "scripts/typescript/lib.es2022.array.d.js";
import { lib_es2022_d_ts as le } from "scripts/typescript/lib.es2022.d.js";
import { lib_es2022_error_d_ts as ae } from "scripts/typescript/lib.es2022.error.d.js";
import { lib_es2022_full_d_ts as ce } from "scripts/typescript/lib.es2022.full.d.js";
import { lib_es2022_object_d_ts as de } from "scripts/typescript/lib.es2022.object.d.js";
import { lib_es2022_string_d_ts as me } from "scripts/typescript/lib.es2022.string.d.js";
import { lib_es5_d_ts as ye } from "scripts/typescript/lib.es5.d.js";
import { lib_es6_d_ts as be } from "scripts/typescript/lib.es6.d.js";
import { lib_esnext_d_ts as fe } from "scripts/typescript/lib.esnext.d.js";
import { lib_esnext_full_d_ts as ue } from "scripts/typescript/lib.esnext.full.d.js";
import { lib_esnext_intl_d_ts as Se } from "scripts/typescript/lib.esnext.intl.d.js";
import { lib_esnext_promise_d_ts as ge } from "scripts/typescript/lib.esnext.promise.d.js";
import { lib_esnext_string_d_ts as we } from "scripts/typescript/lib.esnext.string.d.js";
import { lib_scripthost_d_ts as Ee } from "scripts/typescript/lib.scripthost.d.js";
import { lib_webworker_importscripts_d_ts as ke } from "scripts/typescript/lib.webworker.importscripts.d.js";
import { lib_webworker_iterable_d_ts as he } from "scripts/typescript/lib.webworker.iterable.d.js";
import { lib_gametest_d_ts as je } from "scripts/typescript/lib.gametest.d.js";
import * as De from "./@types/mojang-minecraft-ui/index.d.js";
import * as xe from "./@types/mojang-minecraft/index.d.js";
import * as Oe from "./@types/mojang-gametest/index.d.js";
import {
  ModalFormData as ve,
  MessageFormData as Ce,
  ActionFormData as Ie,
} from "mojang-minecraft-ui";
import { base64_d_ts as Fe } from "scripts/base64.d.js";
import { clonejson_d_ts as Ne } from "scripts/clonejson.d.js";
import { sha256_d_ts as $e } from "scripts/sha256.d.js";
import { viewObj_d_ts as Te } from "scripts/viewObj.d.js";
import { blueimp_md5_d_ts as Pe } from "scripts/blueimp-md5/index.d.js";
import { Validator as Me } from "./jsonschema/lib/index.js";
class Ae {
  static validate = () => new Me().validate(this.value, this.schema);
  static schema = {
    title: "",
    $schema: "http://json-schema.org/draft-04/schema#",
    id: "https://json.schemastore.org/tsconfig",
    definitions: {
      "//": {
        explainer:
          "https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#overview",
        reference: "https://www.typescriptlang.org/tsconfig",
        "reference metadata":
          "https://github.com/microsoft/TypeScript-Website/blob/v2/packages/tsconfig-reference/scripts/tsconfigRules.ts",
      },
      compilerOptionsDefinition: {
        properties: {
          compilerOptions: {
            type: "object",
            description: "",
            properties: {
              charset: {
                description: "",
                type: "string",
                markdownDescription: "",
              },
              composite: {
                description: "",
                type: "boolean",
                default: !0,
                markdownDescription: "",
              },
              declaration: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              declarationDir: {
                description: "",
                type: ["string", "null"],
                markdownDescription: "",
              },
              diagnostics: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              disableReferencedProjectLoad: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              noPropertyAccessFromIndexSignature: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              emitBOM: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              emitDeclarationOnly: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              exactOptionalPropertyTypes: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              incremental: { description: "", type: "boolean" },
              tsBuildInfoFile: {
                description: "",
                default: ".tsbuildinfo",
                type: "string",
                markdownDescription: "",
              },
              inlineSourceMap: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              inlineSources: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              jsx: {
                description: "",
                enum: [
                  "preserve",
                  "react",
                  "react-jsx",
                  "react-jsxdev",
                  "react-native",
                ],
              },
              reactNamespace: {
                description: "",
                type: "string",
                default: "React",
                markdownDescription: "",
              },
              jsxFactory: {
                description: "",
                type: "string",
                default: "React.createElement",
                markdownDescription: "",
              },
              jsxFragmentFactory: {
                description: "",
                type: "string",
                default: "React.Fragment",
                markdownDescription: "",
              },
              jsxImportSource: {
                description: "",
                type: "string",
                default: "react",
                markdownDescription: "",
              },
              listFiles: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              mapRoot: {
                description: "",
                type: "string",
                markdownDescription: "",
              },
              module: {
                description: "",
                type: "string",
                anyOf: [
                  {
                    enum: [
                      "CommonJS",
                      "AMD",
                      "System",
                      "UMD",
                      "ES6",
                      "ES2015",
                      "ES2020",
                      "ESNext",
                      "None",
                      "ES2022",
                      "Node12",
                      "NodeNext",
                    ],
                  },
                ],
                markdownDescription: "",
              },
              newLine: {
                description: "",
                type: "string",
                anyOf: [{ enum: ["crlf", "lf"] }],
                markdownDescription: "",
              },
              noEmit: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              noEmitHelpers: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              noEmitOnError: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              noImplicitAny: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              noImplicitThis: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              noUnusedLocals: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              noUnusedParameters: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              noLib: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              noResolve: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              noStrictGenericChecks: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              skipDefaultLibCheck: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              skipLibCheck: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              outFile: {
                description: "",
                type: "string",
                markdownDescription: "",
              },
              outDir: {
                description: "",
                type: "string",
                markdownDescription: "",
              },
              preserveConstEnums: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              preserveSymlinks: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              preserveValueImports: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              preserveWatchOutput: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              pretty: {
                description: "",
                type: "boolean",
                default: !0,
                markdownDescription: "",
              },
              removeComments: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              rootDir: {
                description: "",
                type: "string",
                markdownDescription: "",
              },
              isolatedModules: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              sourceMap: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              sourceRoot: {
                description: "",
                type: "string",
                markdownDescription: "",
              },
              suppressExcessPropertyErrors: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              suppressImplicitAnyIndexErrors: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              stripInternal: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              target: {
                description: "",
                type: "string",
                default: "ES2015",
                anyOf: [
                  {
                    enum: [
                      "ES3",
                      "ES5",
                      "ES6",
                      "ES2015",
                      "ES2016",
                      "ES2017",
                      "ES2018",
                      "ES2019",
                      "ES2020",
                      "ES2021",
                      "ES2022",
                      "ESNext",
                    ],
                  },
                ],
                markdownDescription: "",
              },
              useUnknownInCatchVariables: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              watch: { description: "", type: "boolean" },
              fallbackPolling: {
                description: "",
                enum: [
                  "fixedPollingInterval",
                  "priorityPollingInterval",
                  "dynamicPriorityPolling",
                  "fixedInterval",
                  "priorityInterval",
                  "dynamicPriority",
                  "fixedChunkSize",
                ],
              },
              watchDirectory: {
                description: "",
                type: "string",
                enum: [
                  "useFsEvents",
                  "fixedPollingInterval",
                  "dynamicPriorityPolling",
                  "fixedChunkSizePolling",
                ],
                default: "useFsEvents",
              },
              watchFile: {
                description: "",
                type: "string",
                enum: [
                  "fixedPollingInterval",
                  "priorityPollingInterval",
                  "dynamicPriorityPolling",
                  "useFsEvents",
                  "useFsEventsOnParentDirectory",
                  "fixedChunkSizePolling",
                ],
                default: "useFsEvents",
              },
              experimentalDecorators: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              emitDecoratorMetadata: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              allowUnusedLabels: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              noImplicitReturns: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              noUncheckedIndexedAccess: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              noFallthroughCasesInSwitch: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              noImplicitOverride: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              allowUnreachableCode: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              forceConsistentCasingInFileNames: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              generateCpuProfile: {
                description: "",
                type: "string",
                default: "profile.cpuprofile",
                markdownDescription: "",
              },
              baseUrl: {
                description: "",
                type: "string",
                markdownDescription: "",
              },
              paths: {
                description: "",
                type: "object",
                additionalProperties: {
                  type: "array",
                  uniqueItems: !0,
                  items: { type: "string", description: "" },
                },
                markdownDescription: "",
              },
              plugins: {
                description: "",
                type: "array",
                items: {
                  type: "object",
                  properties: { name: { description: "", type: "string" } },
                },
                markdownDescription: "",
              },
              rootDirs: {
                description: "",
                type: "array",
                uniqueItems: !0,
                items: { type: "string" },
                markdownDescription: "",
              },
              typeRoots: {
                description: "",
                type: "array",
                uniqueItems: !0,
                items: { type: "string" },
                markdownDescription: "",
              },
              types: {
                description: "",
                type: "array",
                uniqueItems: !0,
                items: { type: "string" },
                markdownDescription: "",
              },
              traceResolution: {
                description: "",
                type: "boolean",
                default: !1,
              },
              allowJs: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              noErrorTruncation: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              allowSyntheticDefaultImports: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              noImplicitUseStrict: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              listEmittedFiles: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              disableSizeLimit: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              lib: {
                description: "",
                type: "array",
                uniqueItems: !0,
                items: {
                  type: "string",
                  anyOf: [
                    {
                      enum: [
                        "ES5",
                        "ES6",
                        "ES2015",
                        "ES2015.Collection",
                        "ES2015.Core",
                        "ES2015.Generator",
                        "ES2015.Iterable",
                        "ES2015.Promise",
                        "ES2015.Proxy",
                        "ES2015.Reflect",
                        "ES2015.Symbol.WellKnown",
                        "ES2015.Symbol",
                        "ES2016",
                        "ES2016.Array.Include",
                        "ES2017",
                        "ES2017.Intl",
                        "ES2017.Object",
                        "ES2017.SharedMemory",
                        "ES2017.String",
                        "ES2017.TypedArrays",
                        "ES2018",
                        "ES2018.AsyncGenerator",
                        "ES2018.AsyncIterable",
                        "ES2018.Intl",
                        "ES2018.Promise",
                        "ES2018.Regexp",
                        "ES2019",
                        "ES2019.Array",
                        "ES2019.Object",
                        "ES2019.String",
                        "ES2019.Symbol",
                        "ES2020",
                        "ES2020.BigInt",
                        "ES2020.Promise",
                        "ES2020.String",
                        "ES2020.Symbol.WellKnown",
                        "ESNext",
                        "ESNext.Array",
                        "ESNext.AsyncIterable",
                        "ESNext.BigInt",
                        "ESNext.Intl",
                        "ESNext.Promise",
                        "ESNext.String",
                        "ESNext.Symbol",
                        "DOM",
                        "DOM.Iterable",
                        "ScriptHost",
                        "WebWorker",
                        "WebWorker.ImportScripts",
                        "Webworker.Iterable",
                        "ES7",
                        "ES2021",
                        "ES2020.SharedMemory",
                        "ES2020.Intl",
                        "ES2021.Promise",
                        "ES2021.String",
                        "ES2021.WeakRef",
                        "ESNext.WeakRef",
                        "es2021.intl",
                      ],
                    },
                  ],
                },
                markdownDescription: "",
              },
              strictNullChecks: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              maxNodeModuleJsDepth: {
                description: "",
                type: "number",
                default: 0,
                markdownDescription: "",
              },
              importHelpers: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              importsNotUsedAsValues: {
                description: "",
                default: "remove",
                enum: ["remove", "preserve", "error"],
              },
              alwaysStrict: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              strict: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              strictBindCallApply: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              downlevelIteration: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              checkJs: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              strictFunctionTypes: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              strictPropertyInitialization: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              esModuleInterop: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              allowUmdGlobalAccess: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              keyofStringsOnly: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              useDefineForClassFields: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              declarationMap: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              resolveJsonModule: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              assumeChangesOnlyAffectDirectDependencies: {
                description: "",
                type: "boolean",
              },
              extendedDiagnostics: {
                description: "",
                type: "boolean",
                default: !1,
                markdownDescription: "",
              },
              listFilesOnly: { description: "", type: "boolean" },
              disableSourceOfProjectReferenceRedirect: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
              disableSolutionSearching: {
                description: "",
                type: "boolean",
                markdownDescription: "",
              },
            },
          },
        },
      },
    },
    type: "object",
    allOf: [{ $ref: "#/definitions/compilerOptionsDefinition" }],
  };
  static value = {
    compilerOptions: {
      allowJs: !1,
      allowSyntheticDefaultImports: !0,
      allowUmdGlobalAccess: !1,
      allowUnreachableCode: !0,
      allowUnusedLabels: !0,
      alwaysStrict: !1,
      charset: "utf8",
      checkJs: !1,
      composite: !1,
      declaration: !1,
      declarationMap: !1,
      disableSizeLimit: !1,
      downlevelIteration: !0,
      emitBOM: !1,
      emitDeclarationOnly: !1,
      esModuleInterop: !1,
      exactOptionalPropertyTypes: !1,
      extendedDiagnostics: !1,
      forceConsistentCasingInFileNames: !1,
      generateCpuProfile: "profile.cpuprofile",
      importHelpers: !1,
      importsNotUsedAsValues: "remove",
      inlineSourceMap: !1,
      inlineSources: !1,
      isolatedModules: !1,
      keyofStringsOnly: !1,
      listEmittedFiles: !1,
      listFiles: !1,
      maxNodeModuleJsDepth: 0,
      module: "ES2015",
      noEmit: !1,
      noEmitHelpers: !1,
      noEmitOnError: !1,
      noErrorTruncation: !1,
      noFallthroughCasesInSwitch: !1,
      noImplicitOverride: !1,
      noImplicitReturns: !1,
      noImplicitUseStrict: !1,
      noLib: !1,
      noResolve: !1,
      noStrictGenericChecks: !1,
      noUnusedLocals: !1,
      noUnusedParameters: !1,
      preserveConstEnums: !1,
      preserveSymlinks: !1,
      preserveValueImports: !1,
      pretty: !0,
      removeComments: !1,
      resolveJsonModule: !1,
      skipDefaultLibCheck: !1,
      skipLibCheck: !1,
      sourceMap: !1,
      strict: !1,
      strictBindCallApply: !1,
      strictFunctionTypes: !1,
      strictNullChecks: !1,
      strictPropertyInitialization: !1,
      suppressExcessPropertyErrors: !1,
      suppressImplicitAnyIndexErrors: !1,
      target: "ES2015",
      traceResolution: !1,
      useDefineForClassFields: !1,
      useUnknownInCatchVariables: !1,
      watchDirectory: "useFsEvents",
      watchFile: "useFsEvents",
      lib: [
        "ES5",
        "ES6",
        "ES2015",
        "ES2015.Collection",
        "ES2015.Core",
        "ES2015.Generator",
        "ES2015.Iterable",
        "ES2015.Promise",
        "ES2015.Proxy",
        "ES2015.Reflect",
        "ES2015.Symbol.WellKnown",
        "ES2015.Symbol",
        "ES2016",
        "ES2016.Array.Include",
        "ES2017",
        "ES2017.Intl",
        "ES2017.Object",
        "ES2017.SharedMemory",
        "ES2017.String",
        "ES2017.TypedArrays",
        "ES2018",
        "ES2018.AsyncGenerator",
        "ES2018.AsyncIterable",
        "ES2018.Intl",
        "ES2018.Promise",
        "ES2018.Regexp",
        "ES2019",
        "ES2019.Array",
        "ES2019.Object",
        "ES2019.String",
        "ES2019.Symbol",
        "ES2020",
        "ES2020.Promise",
        "ES2020.String",
        "ES2020.Symbol.WellKnown",
        "ESNext",
        "ESNext.Array",
        "ESNext.AsyncIterable",
        "ESNext.Intl",
        "ESNext.Promise",
        "ESNext.String",
        "ESNext.Symbol",
        "DOM",
        "ES7",
        "ES2021",
        "ES2020.SharedMemory",
        "ES2020.Intl",
        "ES2021.Promise",
        "ES2021.String",
        "ES2021.WeakRef",
        "ESNext.WeakRef",
        "es2021.intl",
      ],
    },
  };
}
const Ve = {
  ModalForm: {
    dropdown: { defaultValueIndex: null },
    slider: { defaultValue: null },
    textField: { defaultValue: null },
    toggle: { defaultValue: null },
  },
};
function Je(e, t, i) {
  let r = new Ie();
  r.title("TypeScript Configulation").body(
    "TSConfig indicates that the TypeScript project.\n??9https://typescriptlang.org/tsconfig"
  );
  for (const e of Object.keys(t.compilerOptions))
    r.button(
      `${e} [${i.definitions.compilerOptionsDefinition.properties.compilerOptions.properties[e].type}]`
    );
  return (
    r.show(e).then((r) => {
      const { selection: s, isCanceled: o } = r;
      if (!0 === o) return t;
      {
        const r = Object.keys(t.compilerOptions)[s],
          o =
            i.definitions.compilerOptionsDefinition.properties.compilerOptions
              .properties[r];
        if (
          (!0 === n &&
            (l(e.name, `Selection: ${r}`),
            l(e.name, `property.enum: ${!!o.enum}`),
            l(e.name, `property.anyOf: ${!!o.anyOf}`),
            l(e.name, `Boolean: ${"boolean" === o.type}`),
            l(e.name, `Array: ${"array" === o.type}`),
            l(e.name, `Object: ${"object" === o.type}\n`)),
          o.enum)
        ) {
          let i = new Ie();
          i.title("TypeScript Configulation"),
            i.body(`Setting: ${r}\n\nCurrent Value: ${t.compilerOptions[r]}`);
          var p = [];
          for (const e of o.enum) i.button(e), p.push(e);
          i.show(e).then((i) => {
            const { selection: s, isCanceled: o } = i;
            !0 !== o &&
              ((t.compilerOptions[r] = p[s]),
              l(e.name, `You have chosen ${p[s]} in ${r}`));
          });
        } else if (o.anyOf) {
          for (const i of o.anyOf)
            if (i.enum) {
              let s = new Ie();
              s.title("TypeScript Configulation"),
                s.body(
                  `Setting: ${r}\n\nCurrent Value: ${t.compilerOptions[r]}`
                );
              p = [];
              for (const e of i.enum) s.button(e), p.push(e);
              s.show(e).then((i) => {
                const { selection: s, isCanceled: o } = i;
                !0 !== o &&
                  ((t.compilerOptions[r] = p[s]),
                  l(e.name, `You have chosen ${p[s]} in ${r}`));
              });
            }
        } else if ("boolean" == o.type) {
          p = [!0, !1];
          let i = new Ie();
          i.title("TypeScript Configulation"),
            i.body(`Setting: ${r}\n\nCurrent Value: ${t.compilerOptions[r]}`),
            i.button("True", "textures/blocks/wool_colored_lime"),
            i.button("False", "textures/blocks/wool_colored_red"),
            i.show(e).then((i) => {
              const { selection: s, isCanceled: o } = i;
              !0 !== o &&
                ((t.compilerOptions[r] = p[s]),
                l(e.name, `Set ${r} to ${p[s]}`));
            });
        } else {
          let i = new ve();
          i.title("TypeScript Configulation"),
            i.textField(
              `Setting: ${r}\n\nType here to change property value`,
              "object" == typeof t.compilerOptions[r]
                ? JSON.stringify(t.compilerOptions[r])
                : String(t.compilerOptions[r]),
              "object" == typeof t.compilerOptions[r]
                ? JSON.stringify(t.compilerOptions[r])
                : String(t.compilerOptions[r])
            ),
            i.show(e).then((i) => {
              const { formValues: s } = i;
              let [n] = s;
              if ("array" !== o.type || o.enum || o.anyOf)
                if ("object" !== o.type || o.enum || o.anyOf)
                  "string" !== o.type || o.enum || o.anyOf
                    ? "number" !== o.type ||
                      o.enum ||
                      o.anyOf ||
                      (isNaN(n)
                        ? l(
                            e.name,
                            `??cCannot make changes to ${r}: Input is not an ${o.type}.`
                          )
                        : ((t.compilerOptions[r] = Number(n)),
                          l(e.name, `Set ${r} to ${n}`)))
                    : ((t.compilerOptions[r] = n),
                      l(e.name, `Set ${r} to ${n}`));
                else
                  try {
                    (p = JSON.parse(n)) && p.constructor === Object
                      ? ((t.compilerOptions[r] = JSON.parse(n)),
                        l(
                          e.name,
                          `Set ${r} to ${JSON.stringify(JSON.parse(n))}`
                        ))
                      : l(
                          e.name,
                          `??cCannot make changes to ${r}: Input is not an ${o.type}.`
                        );
                  } catch {
                    l(
                      e.name,
                      `??cCannot make changes to ${r}: Error occured when parsing input to JSON.`
                    );
                  }
              else
                try {
                  var p = JSON.parse(n);
                  Array.isArray(p)
                    ? ((t.compilerOptions[r] = JSON.parse(n)),
                      l(e.name, `Set ${r} to ${JSON.stringify(JSON.parse(n))}`))
                    : l(
                        e.name,
                        `??cCannot make changes to ${r}: Input is not an ${o.type}.`
                      );
                } catch {
                  l(
                    e.name,
                    `??cCannot make changes to ${r}: Error occured when parsing input to JSON.`
                  );
                }
            });
        }
      }
    }),
    t
  );
}
function Ue(e, t, i) {
  let r = i,
    s = new ve();
  s.title("TypeScript Interpreter"),
    s.textField("Text Field", "Type here", r.ModalForm.textField.defaultValue),
    s.toggle("Use Mojang Namespace", r.ModalForm.toggle.defaultValue),
    s.show(e).then((i) => {
      const { formValues: s } = i;
      let [o, p] = s;
      if (/[a-z]/i.test(o)) {
        const i = new Date().getTime();
        !0 === n &&
          console.warn(
            `TypeScript: ??6Program starts building at: ${new Date()}`
          ),
          isNaN(o.slice(-1)) || (o += ";"),
          l(t, `==========\n### scriptEngine.ts\n${o}`);
        try {
          const s = (function (e, t, i) {
              const r = {
                  "scriptEngine.ts": e,
                  "lib.d.ts": d,
                  "lib.dom.d.ts": m,
                  "lib.dom.iterable.d.ts": "",
                  "lib.es2015.collection.d.ts": b,
                  "lib.es2015.core.d.ts": f,
                  "lib.es2015.d.ts": u,
                  "lib.es2015.generator.d.ts": S,
                  "lib.es2015.iterable.d.ts": g,
                  "lib.es2015.promise.d.ts": w,
                  "lib.es2015.proxy.d.ts": E,
                  "lib.es2015.reflect.d.ts": k,
                  "lib.es2015.symbol.d.ts": h,
                  "lib.es2015.symbol.wellknown.d.ts": j,
                  "lib.es2016.array.include.d.ts": D,
                  "lib.es2016.d.ts": x,
                  "lib.es2016.full.d.ts": O,
                  "lib.es2017.d.ts": v,
                  "lib.es2017.full.d.ts": C,
                  "lib.es2017.intl.d.ts": I,
                  "lib.es2017.object.d.ts": F,
                  "lib.es2017.sharedmemory.d.ts": N,
                  "lib.es2017.string.d.ts": $,
                  "lib.es2017.typedarrays.d.ts": T,
                  "lib.es2018.asyncgenerator.d.ts": P,
                  "lib.es2018.asynciterable.d.ts": M,
                  "lib.es2018.d.ts": A,
                  "lib.es2018.full.d.ts": V,
                  "lib.es2018.intl.d.ts": J,
                  "lib.es2018.promise.d.ts": U,
                  "lib.es2018.regexp.d.ts": R,
                  "lib.es2019.array.d.ts": L,
                  "lib.es2019.d.ts": W,
                  "lib.es2019.full.d.ts": B,
                  "lib.es2019.object.d.ts": z,
                  "lib.es2019.string.d.ts": G,
                  "lib.es2019.symbol.d.ts": Y,
                  "lib.es2020.bigint.d.ts": "",
                  "lib.es2020.d.ts": q,
                  "lib.es2020.full.d.ts": H,
                  "lib.es2020.intl.d.ts": K,
                  "lib.es2020.promise.d.ts": Q,
                  "lib.es2020.sharedmemory.d.ts": X,
                  "lib.es2020.string.d.ts": Z,
                  "lib.es2020.symbol.wellknown.d.ts": ee,
                  "lib.es2021.d.ts": te,
                  "lib.es2021.full.d.ts": ie,
                  "lib.es2021.intl.d.ts": re,
                  "lib.es2021.promise.d.ts": se,
                  "lib.es2021.string.d.ts": oe,
                  "lib.es2021.weakref.d.ts": ne,
                  "lib.es2022.array.d.ts": pe,
                  "lib.es2022.d.ts": le,
                  "lib.es2022.error.d.ts": ae,
                  "lib.es2022.full.d.ts": ce,
                  "lib.es2022.object.d.ts": de,
                  "lib.es2022.string.d.ts": me,
                  "lib.es5.d.ts": ye,
                  "lib.es6.d.ts": be,
                  "lib.esnext.d.ts": fe,
                  "lib.esnext.full.d.ts": ue,
                  "lib.esnext.intl.d.ts": Se,
                  "lib.esnext.promise.d.ts": ge,
                  "lib.esnext.string.d.ts": we,
                  "lib.scripthost.d.ts": "",
                  "lib.webworker.importscripts.d.ts": "",
                  "lib.webworker.iterable.d.ts": "",
                  "lib.gametest.d.ts": je,
                  "mojang-minecraft.d.ts": !0 === i ? xe.default : xe.Namespace,
                  "mojang-gametest.d.ts": !0 === i ? Oe.default : Oe.Namespace,
                  "mojang-minecraft-ui.d.ts":
                    !0 === i ? De.default : De.Namespace,
                  "base64.d.ts": Fe,
                  "clonetson.d.ts": Ne,
                  "sha256.d.ts": $e,
                  "viewObj.d.ts": Te,
                  "md5.d.ts": Pe,
                },
                s = {},
                o = {
                  fileExists: (e) => {
                    for (const t of Object.keys(r)) return e === t;
                  },
                  directoryExists: (e) => "/" === e,
                  getCurrentDirectory: () => "/",
                  getDirectories: () => [],
                  getCanonicalFileName: (e) => e,
                  getNewLine: () => "\n",
                  getDefaultLibFileName: () => "",
                  getSourceFile: (e) => {
                    var i;
                    for (const s of Object.keys(r)) {
                      if (e === s)
                        return c.createSourceFile(
                          s,
                          r[s],
                          c.ScriptTarget[t.target]
                        );
                      i = void 0;
                    }
                    return i;
                  },
                  readFile: (e) => {
                    var t;
                    for (const i of Object.keys(r)) {
                      if (e === i) return r[i];
                      t = void 0;
                    }
                    return t;
                  },
                  useCaseSensitiveFileNames: () => !0,
                  writeFile: (e, t) => (s[e] = t),
                },
                n = c.createProgram(Object.keys(r), t, o);
              return (
                n.emit(),
                Object.keys(r).forEach((e) =>
                  e.replace(".ts", ".d.ts").replace(".js", ".d.ts")
                ),
                { files: s, diagnostics: c.getPreEmitDiagnostics(n), host: o }
              );
            })(
              o,
              c.convertCompilerOptionsFromJson(Ae.value.compilerOptions)
                .options,
              p
            ),
            y = s.files["scriptEngine.js"].replace(/\u000d\n/g, "\n");
          for (const e of Object.keys(s.files)) l(t, `### ${e}\n${s.files[e]}`);
          if (s.diagnostics.length > 0) {
            !0 === n &&
              console.warn(
                `TypeScript: ??cSome checks were not successful. Time Duration: ${
                  (new Date().getTime() - i) / 1e3
                } seconds`
              );
            const d = c
              .formatDiagnosticsWithColorAndContext(s.diagnostics, s.host)
              .replace(/\[0m/g, "??r")
              .replace(/\[7m/g, "??l")
              .replace(/\[90m/g, "??8")
              .replace(/\[91m/g, "??c")
              .replace(/\[92m/g, "??a")
              .replace(/\[93m/g, "??e")
              .replace(/\[94m/g, "??9")
              .replace(/\[95m/g, "??d")
              .replace(/\[96m/g, "??b")
              .replace(/\[97m/g, "??f");
            let m = new Ce();
            m.title("Compiler Warning"),
              m.body(d),
              m.button1("Build Script"),
              m.button2("Fix Your Code"),
              m.show(e).then((i) => {
                const { selection: s } = i;
                if (0 == s)
                  (r.ModalForm.toggle.defaultValue = p),
                    (r.ModalForm.textField.defaultValue = o),
                    Ue(e, t, r);
                else {
                  let i = JSON.parse(JSON.stringify(Ve));
                  (i.ModalForm.toggle.defaultValue = p),
                    (i.ModalForm.textField.defaultValue = y),
                    (r.ModalForm.textField.defaultValue = o),
                    a(e, t, i);
                }
              }),
              l(t, d);
          } else {
            !0 === n &&
              console.warn(
                `TypeScript: ??aAll checks have passed. Time Duration: ${
                  (new Date().getTime() - i) / 1e3
                } seconds`
              );
            let s = JSON.parse(JSON.stringify(Ve));
            (s.ModalForm.toggle.defaultValue = p),
              (s.ModalForm.textField.defaultValue = y),
              (r.ModalForm.textField.defaultValue = o),
              a(e, t, s);
          }
        } catch (s) {
          if (s.stack && 1 == n) {
            console.warn(
              `TypeScript: ??cSome checks were not successful. Time Duration: ${
                (new Date().getTime() - i) / 1e3
              } seconds`
            ),
              l(t, `??c${String(s)}\n${String(s.stack)}`);
            let n = new Ce();
            n.title("Compile Error"),
              n.body(String(s) + "\n" + String(s.stack)),
              n.button1("Exit"),
              n.button2("Fix Your Code"),
              n.show(e).then((i) => {
                const { selection: s } = i;
                0 == s &&
                  ((r.ModalForm.toggle.defaultValue = p),
                  (r.ModalForm.textField.defaultValue = o),
                  Ue(e, t, r));
              });
          } else {
            l(t, `??c${s}\n${s.stack.split("\n").slice(0, -2)}`);
            let i = new Ce();
            i.title("Compile Error"),
              i.body(`${s}\n${s.stack.split("\n").slice(0, -2)}`),
              i.button1("Exit"),
              i.button2("Fix Your Code"),
              i.show(e).then((i) => {
                const { selection: s } = i;
                0 == s &&
                  ((r.ModalForm.toggle.defaultValue = p),
                  (r.ModalForm.textField.defaultValue = o),
                  Ue(e, t, r));
              });
          }
        }
        l(t, "==========");
      }
    });
}
e.events.beforeChat.subscribe((e) => {
  const { message: r, sender: n } = e;
  let a = n.name ?? n.nameTag,
    c = !1;
  if (
    ((c = !(1 != o || !s.includes(a)) || 0 == o),
    r == `${p}typescript` && 1 == c)
  ) {
    e.cancel = !0;
    let r = new t(i.enchantedBook, 1);
    (r.nameTag = "??r??dTypeScript interpreter"),
      r.setLore(["??r??5Use this item to open TypeScript interpreter"]),
      n.getComponent("minecraft:inventory").container.addItem(r),
      l(a, `You have been given a ${r.nameTag}`);
  } else if (r == `${p}typescript version`)
    (e.cancel = !0),
      l(
        a,
        "??6typescript??r@??64.6.3??r | ??2Apache-2.0??r | deps: ??2none??r | versions: ??22277??r\nTypeScript is a language for application scale JavaScript development\n??9https://typescriptlang.org/"
      );
  else if (r == `${p}tsconfig`) {
    e.cancel = !0;
    let r = new t(i.enchantedBook, 1);
    (r.nameTag = "??r??dTypeScript Configulation"),
      r.setLore([
        "??r??5TypeScript Config",
        "Use this item to edit configulation",
      ]),
      n.getComponent("minecraft:inventory").container.addItem(r),
      l(a, `You have been given a ${r.nameTag}`);
  }
}),
  e.events.beforeItemUse.subscribe((e) => {
    let { source: t, item: i } = e,
      r = t.name ?? t.nameTag;
    if (
      "minecraft:enchanted_book" == i.id &&
      "??r??5Use this item to open TypeScript interpreter" == i.getLore()[0]
    ) {
      let e = Ve;
      null == e.ModalForm.toggle.defaultValue &&
        (e.ModalForm.toggle.defaultValue = !0),
        Ue(t, r, e);
    } else if (
      "minecraft:enchanted_book" == i.id &&
      "??r??5TypeScript Config" === i.getLore()[0] &&
      "Use this item to edit configulation" === i.getLore()[1] &&
      ((Ae.value = Je(t, Ae.value, Ae.schema)), Ae.validate().errors.length > 0)
    ) {
      var s = [];
      for (let e of Ae.validate().errors) s.push(e);
      let e = new Ce();
      e.title("Config Error"),
        e.body(s.join("\n")),
        e.button1("Ignore Errors"),
        e.button2("Fix Config"),
        e.show(t).then((e) => {
          const { selection: i } = e;
          0 == i && (Ae.value = Je(t, Ae.value, Ae.schema));
        });
    }
  });
