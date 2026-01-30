
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Batch
 * 
 */
export type Batch = $Result.DefaultSelection<Prisma.$BatchPayload>
/**
 * Model TopicCard
 * 
 */
export type TopicCard = $Result.DefaultSelection<Prisma.$TopicCardPayload>
/**
 * Model IngestedArticle
 * 
 */
export type IngestedArticle = $Result.DefaultSelection<Prisma.$IngestedArticlePayload>

/**
 * ##  Prisma Client 什刷
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Batches
 * const batches = await prisma.batch.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client 什刷
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Batches
   * const batches = await prisma.batch.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.batch`: Exposes CRUD operations for the **Batch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Batches
    * const batches = await prisma.batch.findMany()
    * ```
    */
  get batch(): Prisma.BatchDelegate<ExtArgs>;

  /**
   * `prisma.topicCard`: Exposes CRUD operations for the **TopicCard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TopicCards
    * const topicCards = await prisma.topicCard.findMany()
    * ```
    */
  get topicCard(): Prisma.TopicCardDelegate<ExtArgs>;

  /**
   * `prisma.ingestedArticle`: Exposes CRUD operations for the **IngestedArticle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IngestedArticles
    * const ingestedArticles = await prisma.ingestedArticle.findMany()
    * ```
    */
  get ingestedArticle(): Prisma.IngestedArticleDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Batch: 'Batch',
    TopicCard: 'TopicCard',
    IngestedArticle: 'IngestedArticle'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "batch" | "topicCard" | "ingestedArticle"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Batch: {
        payload: Prisma.$BatchPayload<ExtArgs>
        fields: Prisma.BatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          findFirst: {
            args: Prisma.BatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          findMany: {
            args: Prisma.BatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>[]
          }
          create: {
            args: Prisma.BatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          createMany: {
            args: Prisma.BatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>[]
          }
          delete: {
            args: Prisma.BatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          update: {
            args: Prisma.BatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          deleteMany: {
            args: Prisma.BatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          aggregate: {
            args: Prisma.BatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBatch>
          }
          groupBy: {
            args: Prisma.BatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<BatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.BatchCountArgs<ExtArgs>
            result: $Utils.Optional<BatchCountAggregateOutputType> | number
          }
        }
      }
      TopicCard: {
        payload: Prisma.$TopicCardPayload<ExtArgs>
        fields: Prisma.TopicCardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TopicCardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicCardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TopicCardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicCardPayload>
          }
          findFirst: {
            args: Prisma.TopicCardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicCardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TopicCardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicCardPayload>
          }
          findMany: {
            args: Prisma.TopicCardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicCardPayload>[]
          }
          create: {
            args: Prisma.TopicCardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicCardPayload>
          }
          createMany: {
            args: Prisma.TopicCardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TopicCardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicCardPayload>[]
          }
          delete: {
            args: Prisma.TopicCardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicCardPayload>
          }
          update: {
            args: Prisma.TopicCardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicCardPayload>
          }
          deleteMany: {
            args: Prisma.TopicCardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TopicCardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TopicCardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TopicCardPayload>
          }
          aggregate: {
            args: Prisma.TopicCardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTopicCard>
          }
          groupBy: {
            args: Prisma.TopicCardGroupByArgs<ExtArgs>
            result: $Utils.Optional<TopicCardGroupByOutputType>[]
          }
          count: {
            args: Prisma.TopicCardCountArgs<ExtArgs>
            result: $Utils.Optional<TopicCardCountAggregateOutputType> | number
          }
        }
      }
      IngestedArticle: {
        payload: Prisma.$IngestedArticlePayload<ExtArgs>
        fields: Prisma.IngestedArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IngestedArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestedArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IngestedArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestedArticlePayload>
          }
          findFirst: {
            args: Prisma.IngestedArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestedArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IngestedArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestedArticlePayload>
          }
          findMany: {
            args: Prisma.IngestedArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestedArticlePayload>[]
          }
          create: {
            args: Prisma.IngestedArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestedArticlePayload>
          }
          createMany: {
            args: Prisma.IngestedArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IngestedArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestedArticlePayload>[]
          }
          delete: {
            args: Prisma.IngestedArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestedArticlePayload>
          }
          update: {
            args: Prisma.IngestedArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestedArticlePayload>
          }
          deleteMany: {
            args: Prisma.IngestedArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IngestedArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.IngestedArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IngestedArticlePayload>
          }
          aggregate: {
            args: Prisma.IngestedArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIngestedArticle>
          }
          groupBy: {
            args: Prisma.IngestedArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<IngestedArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.IngestedArticleCountArgs<ExtArgs>
            result: $Utils.Optional<IngestedArticleCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BatchCountOutputType
   */

  export type BatchCountOutputType = {
    cards: number
    articles: number
  }

  export type BatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cards?: boolean | BatchCountOutputTypeCountCardsArgs
    articles?: boolean | BatchCountOutputTypeCountArticlesArgs
  }

  // Custom InputTypes
  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchCountOutputType
     */
    select?: BatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeCountCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TopicCardWhereInput
  }

  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeCountArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IngestedArticleWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Batch
   */

  export type AggregateBatch = {
    _count: BatchCountAggregateOutputType | null
    _avg: BatchAvgAggregateOutputType | null
    _sum: BatchSumAggregateOutputType | null
    _min: BatchMinAggregateOutputType | null
    _max: BatchMaxAggregateOutputType | null
  }

  export type BatchAvgAggregateOutputType = {
    articleCount: number | null
    europeArticleCount: number | null
  }

  export type BatchSumAggregateOutputType = {
    articleCount: number | null
    europeArticleCount: number | null
  }

  export type BatchMinAggregateOutputType = {
    id: string | null
    createdAtUtc: Date | null
    windowStartUtc: Date | null
    windowEndUtc: Date | null
    status: string | null
    error: string | null
    gdeltQuery: string | null
    gdeltUrl: string | null
    articleCount: number | null
    europeArticleCount: number | null
    supplementLinksText: string | null
  }

  export type BatchMaxAggregateOutputType = {
    id: string | null
    createdAtUtc: Date | null
    windowStartUtc: Date | null
    windowEndUtc: Date | null
    status: string | null
    error: string | null
    gdeltQuery: string | null
    gdeltUrl: string | null
    articleCount: number | null
    europeArticleCount: number | null
    supplementLinksText: string | null
  }

  export type BatchCountAggregateOutputType = {
    id: number
    createdAtUtc: number
    windowStartUtc: number
    windowEndUtc: number
    status: number
    error: number
    gdeltQuery: number
    gdeltUrl: number
    articleCount: number
    europeArticleCount: number
    supplementLinksText: number
    _all: number
  }


  export type BatchAvgAggregateInputType = {
    articleCount?: true
    europeArticleCount?: true
  }

  export type BatchSumAggregateInputType = {
    articleCount?: true
    europeArticleCount?: true
  }

  export type BatchMinAggregateInputType = {
    id?: true
    createdAtUtc?: true
    windowStartUtc?: true
    windowEndUtc?: true
    status?: true
    error?: true
    gdeltQuery?: true
    gdeltUrl?: true
    articleCount?: true
    europeArticleCount?: true
    supplementLinksText?: true
  }

  export type BatchMaxAggregateInputType = {
    id?: true
    createdAtUtc?: true
    windowStartUtc?: true
    windowEndUtc?: true
    status?: true
    error?: true
    gdeltQuery?: true
    gdeltUrl?: true
    articleCount?: true
    europeArticleCount?: true
    supplementLinksText?: true
  }

  export type BatchCountAggregateInputType = {
    id?: true
    createdAtUtc?: true
    windowStartUtc?: true
    windowEndUtc?: true
    status?: true
    error?: true
    gdeltQuery?: true
    gdeltUrl?: true
    articleCount?: true
    europeArticleCount?: true
    supplementLinksText?: true
    _all?: true
  }

  export type BatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Batch to aggregate.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `卤n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Batches
    **/
    _count?: true | BatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BatchMaxAggregateInputType
  }

  export type GetBatchAggregateType<T extends BatchAggregateArgs> = {
        [P in keyof T & keyof AggregateBatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBatch[P]>
      : GetScalarType<T[P], AggregateBatch[P]>
  }




  export type BatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BatchWhereInput
    orderBy?: BatchOrderByWithAggregationInput | BatchOrderByWithAggregationInput[]
    by: BatchScalarFieldEnum[] | BatchScalarFieldEnum
    having?: BatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BatchCountAggregateInputType | true
    _avg?: BatchAvgAggregateInputType
    _sum?: BatchSumAggregateInputType
    _min?: BatchMinAggregateInputType
    _max?: BatchMaxAggregateInputType
  }

  export type BatchGroupByOutputType = {
    id: string
    createdAtUtc: Date
    windowStartUtc: Date
    windowEndUtc: Date
    status: string
    error: string | null
    gdeltQuery: string
    gdeltUrl: string
    articleCount: number
    europeArticleCount: number
    supplementLinksText: string | null
    _count: BatchCountAggregateOutputType | null
    _avg: BatchAvgAggregateOutputType | null
    _sum: BatchSumAggregateOutputType | null
    _min: BatchMinAggregateOutputType | null
    _max: BatchMaxAggregateOutputType | null
  }

  type GetBatchGroupByPayload<T extends BatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BatchGroupByOutputType[P]>
            : GetScalarType<T[P], BatchGroupByOutputType[P]>
        }
      >
    >


  export type BatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAtUtc?: boolean
    windowStartUtc?: boolean
    windowEndUtc?: boolean
    status?: boolean
    error?: boolean
    gdeltQuery?: boolean
    gdeltUrl?: boolean
    articleCount?: boolean
    europeArticleCount?: boolean
    supplementLinksText?: boolean
    cards?: boolean | Batch$cardsArgs<ExtArgs>
    articles?: boolean | Batch$articlesArgs<ExtArgs>
    _count?: boolean | BatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["batch"]>

  export type BatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAtUtc?: boolean
    windowStartUtc?: boolean
    windowEndUtc?: boolean
    status?: boolean
    error?: boolean
    gdeltQuery?: boolean
    gdeltUrl?: boolean
    articleCount?: boolean
    europeArticleCount?: boolean
    supplementLinksText?: boolean
  }, ExtArgs["result"]["batch"]>

  export type BatchSelectScalar = {
    id?: boolean
    createdAtUtc?: boolean
    windowStartUtc?: boolean
    windowEndUtc?: boolean
    status?: boolean
    error?: boolean
    gdeltQuery?: boolean
    gdeltUrl?: boolean
    articleCount?: boolean
    europeArticleCount?: boolean
    supplementLinksText?: boolean
  }

  export type BatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cards?: boolean | Batch$cardsArgs<ExtArgs>
    articles?: boolean | Batch$articlesArgs<ExtArgs>
    _count?: boolean | BatchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Batch"
    objects: {
      cards: Prisma.$TopicCardPayload<ExtArgs>[]
      articles: Prisma.$IngestedArticlePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAtUtc: Date
      windowStartUtc: Date
      windowEndUtc: Date
      status: string
      error: string | null
      gdeltQuery: string
      gdeltUrl: string
      articleCount: number
      europeArticleCount: number
      supplementLinksText: string | null
    }, ExtArgs["result"]["batch"]>
    composites: {}
  }

  type BatchGetPayload<S extends boolean | null | undefined | BatchDefaultArgs> = $Result.GetResult<Prisma.$BatchPayload, S>

  type BatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BatchFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BatchCountAggregateInputType | true
    }

  export interface BatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Batch'], meta: { name: 'Batch' } }
    /**
     * Find zero or one Batch that matches the filter.
     * @param {BatchFindUniqueArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BatchFindUniqueArgs>(args: SelectSubset<T, BatchFindUniqueArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Batch that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BatchFindUniqueOrThrowArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BatchFindUniqueOrThrowArgs>(args: SelectSubset<T, BatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Batch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindFirstArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BatchFindFirstArgs>(args?: SelectSubset<T, BatchFindFirstArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Batch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindFirstOrThrowArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BatchFindFirstOrThrowArgs>(args?: SelectSubset<T, BatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Batches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Batches
     * const batches = await prisma.batch.findMany()
     * 
     * // Get first 10 Batches
     * const batches = await prisma.batch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const batchWithIdOnly = await prisma.batch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BatchFindManyArgs>(args?: SelectSubset<T, BatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Batch.
     * @param {BatchCreateArgs} args - Arguments to create a Batch.
     * @example
     * // Create one Batch
     * const Batch = await prisma.batch.create({
     *   data: {
     *     // ... data to create a Batch
     *   }
     * })
     * 
     */
    create<T extends BatchCreateArgs>(args: SelectSubset<T, BatchCreateArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Batches.
     * @param {BatchCreateManyArgs} args - Arguments to create many Batches.
     * @example
     * // Create many Batches
     * const batch = await prisma.batch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BatchCreateManyArgs>(args?: SelectSubset<T, BatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Batches and returns the data saved in the database.
     * @param {BatchCreateManyAndReturnArgs} args - Arguments to create many Batches.
     * @example
     * // Create many Batches
     * const batch = await prisma.batch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Batches and only return the `id`
     * const batchWithIdOnly = await prisma.batch.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BatchCreateManyAndReturnArgs>(args?: SelectSubset<T, BatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Batch.
     * @param {BatchDeleteArgs} args - Arguments to delete one Batch.
     * @example
     * // Delete one Batch
     * const Batch = await prisma.batch.delete({
     *   where: {
     *     // ... filter to delete one Batch
     *   }
     * })
     * 
     */
    delete<T extends BatchDeleteArgs>(args: SelectSubset<T, BatchDeleteArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Batch.
     * @param {BatchUpdateArgs} args - Arguments to update one Batch.
     * @example
     * // Update one Batch
     * const batch = await prisma.batch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BatchUpdateArgs>(args: SelectSubset<T, BatchUpdateArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Batches.
     * @param {BatchDeleteManyArgs} args - Arguments to filter Batches to delete.
     * @example
     * // Delete a few Batches
     * const { count } = await prisma.batch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BatchDeleteManyArgs>(args?: SelectSubset<T, BatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Batches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Batches
     * const batch = await prisma.batch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BatchUpdateManyArgs>(args: SelectSubset<T, BatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Batch.
     * @param {BatchUpsertArgs} args - Arguments to update or create a Batch.
     * @example
     * // Update or create a Batch
     * const batch = await prisma.batch.upsert({
     *   create: {
     *     // ... data to create a Batch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Batch we want to update
     *   }
     * })
     */
    upsert<T extends BatchUpsertArgs>(args: SelectSubset<T, BatchUpsertArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Batches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchCountArgs} args - Arguments to filter Batches to count.
     * @example
     * // Count the number of Batches
     * const count = await prisma.batch.count({
     *   where: {
     *     // ... the filter for the Batches we want to count
     *   }
     * })
    **/
    count<T extends BatchCountArgs>(
      args?: Subset<T, BatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Batch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BatchAggregateArgs>(args: Subset<T, BatchAggregateArgs>): Prisma.PrismaPromise<GetBatchAggregateType<T>>

    /**
     * Group by Batch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BatchGroupByArgs['orderBy'] }
        : { orderBy?: BatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Batch model
   */
  readonly fields: BatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Batch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cards<T extends Batch$cardsArgs<ExtArgs> = {}>(args?: Subset<T, Batch$cardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TopicCardPayload<ExtArgs>, T, "findMany"> | Null>
    articles<T extends Batch$articlesArgs<ExtArgs> = {}>(args?: Subset<T, Batch$articlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngestedArticlePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Batch model
   */ 
  interface BatchFieldRefs {
    readonly id: FieldRef<"Batch", 'String'>
    readonly createdAtUtc: FieldRef<"Batch", 'DateTime'>
    readonly windowStartUtc: FieldRef<"Batch", 'DateTime'>
    readonly windowEndUtc: FieldRef<"Batch", 'DateTime'>
    readonly status: FieldRef<"Batch", 'String'>
    readonly error: FieldRef<"Batch", 'String'>
    readonly gdeltQuery: FieldRef<"Batch", 'String'>
    readonly gdeltUrl: FieldRef<"Batch", 'String'>
    readonly articleCount: FieldRef<"Batch", 'Int'>
    readonly europeArticleCount: FieldRef<"Batch", 'Int'>
    readonly supplementLinksText: FieldRef<"Batch", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Batch findUnique
   */
  export type BatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch findUniqueOrThrow
   */
  export type BatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch findFirst
   */
  export type BatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `卤n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Batches.
     */
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch findFirstOrThrow
   */
  export type BatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `卤n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Batches.
     */
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch findMany
   */
  export type BatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batches to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `卤n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch create
   */
  export type BatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The data needed to create a Batch.
     */
    data: XOR<BatchCreateInput, BatchUncheckedCreateInput>
  }

  /**
   * Batch createMany
   */
  export type BatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Batches.
     */
    data: BatchCreateManyInput | BatchCreateManyInput[]
  }

  /**
   * Batch createManyAndReturn
   */
  export type BatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Batches.
     */
    data: BatchCreateManyInput | BatchCreateManyInput[]
  }

  /**
   * Batch update
   */
  export type BatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The data needed to update a Batch.
     */
    data: XOR<BatchUpdateInput, BatchUncheckedUpdateInput>
    /**
     * Choose, which Batch to update.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch updateMany
   */
  export type BatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Batches.
     */
    data: XOR<BatchUpdateManyMutationInput, BatchUncheckedUpdateManyInput>
    /**
     * Filter which Batches to update
     */
    where?: BatchWhereInput
  }

  /**
   * Batch upsert
   */
  export type BatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The filter to search for the Batch to update in case it exists.
     */
    where: BatchWhereUniqueInput
    /**
     * In case the Batch found by the `where` argument doesn't exist, create a new Batch with this data.
     */
    create: XOR<BatchCreateInput, BatchUncheckedCreateInput>
    /**
     * In case the Batch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BatchUpdateInput, BatchUncheckedUpdateInput>
  }

  /**
   * Batch delete
   */
  export type BatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter which Batch to delete.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch deleteMany
   */
  export type BatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Batches to delete
     */
    where?: BatchWhereInput
  }

  /**
   * Batch.cards
   */
  export type Batch$cardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicCard
     */
    select?: TopicCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicCardInclude<ExtArgs> | null
    where?: TopicCardWhereInput
    orderBy?: TopicCardOrderByWithRelationInput | TopicCardOrderByWithRelationInput[]
    cursor?: TopicCardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TopicCardScalarFieldEnum | TopicCardScalarFieldEnum[]
  }

  /**
   * Batch.articles
   */
  export type Batch$articlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestedArticle
     */
    select?: IngestedArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestedArticleInclude<ExtArgs> | null
    where?: IngestedArticleWhereInput
    orderBy?: IngestedArticleOrderByWithRelationInput | IngestedArticleOrderByWithRelationInput[]
    cursor?: IngestedArticleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IngestedArticleScalarFieldEnum | IngestedArticleScalarFieldEnum[]
  }

  /**
   * Batch without action
   */
  export type BatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
  }


  /**
   * Model TopicCard
   */

  export type AggregateTopicCard = {
    _count: TopicCardCountAggregateOutputType | null
    _avg: TopicCardAvgAggregateOutputType | null
    _sum: TopicCardSumAggregateOutputType | null
    _min: TopicCardMinAggregateOutputType | null
    _max: TopicCardMaxAggregateOutputType | null
  }

  export type TopicCardAvgAggregateOutputType = {
    rank: number | null
    score: number | null
  }

  export type TopicCardSumAggregateOutputType = {
    rank: number | null
    score: number | null
  }

  export type TopicCardMinAggregateOutputType = {
    id: string | null
    createdAtUtc: Date | null
    batchId: string | null
    rank: number | null
    score: number | null
    clusterKey: string | null
    cardJsonText: string | null
  }

  export type TopicCardMaxAggregateOutputType = {
    id: string | null
    createdAtUtc: Date | null
    batchId: string | null
    rank: number | null
    score: number | null
    clusterKey: string | null
    cardJsonText: string | null
  }

  export type TopicCardCountAggregateOutputType = {
    id: number
    createdAtUtc: number
    batchId: number
    rank: number
    score: number
    clusterKey: number
    cardJsonText: number
    _all: number
  }


  export type TopicCardAvgAggregateInputType = {
    rank?: true
    score?: true
  }

  export type TopicCardSumAggregateInputType = {
    rank?: true
    score?: true
  }

  export type TopicCardMinAggregateInputType = {
    id?: true
    createdAtUtc?: true
    batchId?: true
    rank?: true
    score?: true
    clusterKey?: true
    cardJsonText?: true
  }

  export type TopicCardMaxAggregateInputType = {
    id?: true
    createdAtUtc?: true
    batchId?: true
    rank?: true
    score?: true
    clusterKey?: true
    cardJsonText?: true
  }

  export type TopicCardCountAggregateInputType = {
    id?: true
    createdAtUtc?: true
    batchId?: true
    rank?: true
    score?: true
    clusterKey?: true
    cardJsonText?: true
    _all?: true
  }

  export type TopicCardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TopicCard to aggregate.
     */
    where?: TopicCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TopicCards to fetch.
     */
    orderBy?: TopicCardOrderByWithRelationInput | TopicCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TopicCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `卤n` TopicCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TopicCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TopicCards
    **/
    _count?: true | TopicCardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TopicCardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TopicCardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TopicCardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TopicCardMaxAggregateInputType
  }

  export type GetTopicCardAggregateType<T extends TopicCardAggregateArgs> = {
        [P in keyof T & keyof AggregateTopicCard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTopicCard[P]>
      : GetScalarType<T[P], AggregateTopicCard[P]>
  }




  export type TopicCardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TopicCardWhereInput
    orderBy?: TopicCardOrderByWithAggregationInput | TopicCardOrderByWithAggregationInput[]
    by: TopicCardScalarFieldEnum[] | TopicCardScalarFieldEnum
    having?: TopicCardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TopicCardCountAggregateInputType | true
    _avg?: TopicCardAvgAggregateInputType
    _sum?: TopicCardSumAggregateInputType
    _min?: TopicCardMinAggregateInputType
    _max?: TopicCardMaxAggregateInputType
  }

  export type TopicCardGroupByOutputType = {
    id: string
    createdAtUtc: Date
    batchId: string
    rank: number
    score: number
    clusterKey: string
    cardJsonText: string
    _count: TopicCardCountAggregateOutputType | null
    _avg: TopicCardAvgAggregateOutputType | null
    _sum: TopicCardSumAggregateOutputType | null
    _min: TopicCardMinAggregateOutputType | null
    _max: TopicCardMaxAggregateOutputType | null
  }

  type GetTopicCardGroupByPayload<T extends TopicCardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TopicCardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TopicCardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TopicCardGroupByOutputType[P]>
            : GetScalarType<T[P], TopicCardGroupByOutputType[P]>
        }
      >
    >


  export type TopicCardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAtUtc?: boolean
    batchId?: boolean
    rank?: boolean
    score?: boolean
    clusterKey?: boolean
    cardJsonText?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["topicCard"]>

  export type TopicCardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAtUtc?: boolean
    batchId?: boolean
    rank?: boolean
    score?: boolean
    clusterKey?: boolean
    cardJsonText?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["topicCard"]>

  export type TopicCardSelectScalar = {
    id?: boolean
    createdAtUtc?: boolean
    batchId?: boolean
    rank?: boolean
    score?: boolean
    clusterKey?: boolean
    cardJsonText?: boolean
  }

  export type TopicCardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }
  export type TopicCardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }

  export type $TopicCardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TopicCard"
    objects: {
      batch: Prisma.$BatchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAtUtc: Date
      batchId: string
      rank: number
      score: number
      clusterKey: string
      cardJsonText: string
    }, ExtArgs["result"]["topicCard"]>
    composites: {}
  }

  type TopicCardGetPayload<S extends boolean | null | undefined | TopicCardDefaultArgs> = $Result.GetResult<Prisma.$TopicCardPayload, S>

  type TopicCardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TopicCardFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TopicCardCountAggregateInputType | true
    }

  export interface TopicCardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TopicCard'], meta: { name: 'TopicCard' } }
    /**
     * Find zero or one TopicCard that matches the filter.
     * @param {TopicCardFindUniqueArgs} args - Arguments to find a TopicCard
     * @example
     * // Get one TopicCard
     * const topicCard = await prisma.topicCard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TopicCardFindUniqueArgs>(args: SelectSubset<T, TopicCardFindUniqueArgs<ExtArgs>>): Prisma__TopicCardClient<$Result.GetResult<Prisma.$TopicCardPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TopicCard that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TopicCardFindUniqueOrThrowArgs} args - Arguments to find a TopicCard
     * @example
     * // Get one TopicCard
     * const topicCard = await prisma.topicCard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TopicCardFindUniqueOrThrowArgs>(args: SelectSubset<T, TopicCardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TopicCardClient<$Result.GetResult<Prisma.$TopicCardPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TopicCard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicCardFindFirstArgs} args - Arguments to find a TopicCard
     * @example
     * // Get one TopicCard
     * const topicCard = await prisma.topicCard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TopicCardFindFirstArgs>(args?: SelectSubset<T, TopicCardFindFirstArgs<ExtArgs>>): Prisma__TopicCardClient<$Result.GetResult<Prisma.$TopicCardPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TopicCard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicCardFindFirstOrThrowArgs} args - Arguments to find a TopicCard
     * @example
     * // Get one TopicCard
     * const topicCard = await prisma.topicCard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TopicCardFindFirstOrThrowArgs>(args?: SelectSubset<T, TopicCardFindFirstOrThrowArgs<ExtArgs>>): Prisma__TopicCardClient<$Result.GetResult<Prisma.$TopicCardPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TopicCards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicCardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TopicCards
     * const topicCards = await prisma.topicCard.findMany()
     * 
     * // Get first 10 TopicCards
     * const topicCards = await prisma.topicCard.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const topicCardWithIdOnly = await prisma.topicCard.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TopicCardFindManyArgs>(args?: SelectSubset<T, TopicCardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TopicCardPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TopicCard.
     * @param {TopicCardCreateArgs} args - Arguments to create a TopicCard.
     * @example
     * // Create one TopicCard
     * const TopicCard = await prisma.topicCard.create({
     *   data: {
     *     // ... data to create a TopicCard
     *   }
     * })
     * 
     */
    create<T extends TopicCardCreateArgs>(args: SelectSubset<T, TopicCardCreateArgs<ExtArgs>>): Prisma__TopicCardClient<$Result.GetResult<Prisma.$TopicCardPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TopicCards.
     * @param {TopicCardCreateManyArgs} args - Arguments to create many TopicCards.
     * @example
     * // Create many TopicCards
     * const topicCard = await prisma.topicCard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TopicCardCreateManyArgs>(args?: SelectSubset<T, TopicCardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TopicCards and returns the data saved in the database.
     * @param {TopicCardCreateManyAndReturnArgs} args - Arguments to create many TopicCards.
     * @example
     * // Create many TopicCards
     * const topicCard = await prisma.topicCard.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TopicCards and only return the `id`
     * const topicCardWithIdOnly = await prisma.topicCard.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TopicCardCreateManyAndReturnArgs>(args?: SelectSubset<T, TopicCardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TopicCardPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TopicCard.
     * @param {TopicCardDeleteArgs} args - Arguments to delete one TopicCard.
     * @example
     * // Delete one TopicCard
     * const TopicCard = await prisma.topicCard.delete({
     *   where: {
     *     // ... filter to delete one TopicCard
     *   }
     * })
     * 
     */
    delete<T extends TopicCardDeleteArgs>(args: SelectSubset<T, TopicCardDeleteArgs<ExtArgs>>): Prisma__TopicCardClient<$Result.GetResult<Prisma.$TopicCardPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TopicCard.
     * @param {TopicCardUpdateArgs} args - Arguments to update one TopicCard.
     * @example
     * // Update one TopicCard
     * const topicCard = await prisma.topicCard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TopicCardUpdateArgs>(args: SelectSubset<T, TopicCardUpdateArgs<ExtArgs>>): Prisma__TopicCardClient<$Result.GetResult<Prisma.$TopicCardPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TopicCards.
     * @param {TopicCardDeleteManyArgs} args - Arguments to filter TopicCards to delete.
     * @example
     * // Delete a few TopicCards
     * const { count } = await prisma.topicCard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TopicCardDeleteManyArgs>(args?: SelectSubset<T, TopicCardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TopicCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicCardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TopicCards
     * const topicCard = await prisma.topicCard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TopicCardUpdateManyArgs>(args: SelectSubset<T, TopicCardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TopicCard.
     * @param {TopicCardUpsertArgs} args - Arguments to update or create a TopicCard.
     * @example
     * // Update or create a TopicCard
     * const topicCard = await prisma.topicCard.upsert({
     *   create: {
     *     // ... data to create a TopicCard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TopicCard we want to update
     *   }
     * })
     */
    upsert<T extends TopicCardUpsertArgs>(args: SelectSubset<T, TopicCardUpsertArgs<ExtArgs>>): Prisma__TopicCardClient<$Result.GetResult<Prisma.$TopicCardPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TopicCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicCardCountArgs} args - Arguments to filter TopicCards to count.
     * @example
     * // Count the number of TopicCards
     * const count = await prisma.topicCard.count({
     *   where: {
     *     // ... the filter for the TopicCards we want to count
     *   }
     * })
    **/
    count<T extends TopicCardCountArgs>(
      args?: Subset<T, TopicCardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TopicCardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TopicCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicCardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TopicCardAggregateArgs>(args: Subset<T, TopicCardAggregateArgs>): Prisma.PrismaPromise<GetTopicCardAggregateType<T>>

    /**
     * Group by TopicCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicCardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TopicCardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TopicCardGroupByArgs['orderBy'] }
        : { orderBy?: TopicCardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TopicCardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTopicCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TopicCard model
   */
  readonly fields: TopicCardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TopicCard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TopicCardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    batch<T extends BatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BatchDefaultArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TopicCard model
   */ 
  interface TopicCardFieldRefs {
    readonly id: FieldRef<"TopicCard", 'String'>
    readonly createdAtUtc: FieldRef<"TopicCard", 'DateTime'>
    readonly batchId: FieldRef<"TopicCard", 'String'>
    readonly rank: FieldRef<"TopicCard", 'Int'>
    readonly score: FieldRef<"TopicCard", 'Float'>
    readonly clusterKey: FieldRef<"TopicCard", 'String'>
    readonly cardJsonText: FieldRef<"TopicCard", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TopicCard findUnique
   */
  export type TopicCardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicCard
     */
    select?: TopicCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicCardInclude<ExtArgs> | null
    /**
     * Filter, which TopicCard to fetch.
     */
    where: TopicCardWhereUniqueInput
  }

  /**
   * TopicCard findUniqueOrThrow
   */
  export type TopicCardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicCard
     */
    select?: TopicCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicCardInclude<ExtArgs> | null
    /**
     * Filter, which TopicCard to fetch.
     */
    where: TopicCardWhereUniqueInput
  }

  /**
   * TopicCard findFirst
   */
  export type TopicCardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicCard
     */
    select?: TopicCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicCardInclude<ExtArgs> | null
    /**
     * Filter, which TopicCard to fetch.
     */
    where?: TopicCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TopicCards to fetch.
     */
    orderBy?: TopicCardOrderByWithRelationInput | TopicCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TopicCards.
     */
    cursor?: TopicCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `卤n` TopicCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TopicCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TopicCards.
     */
    distinct?: TopicCardScalarFieldEnum | TopicCardScalarFieldEnum[]
  }

  /**
   * TopicCard findFirstOrThrow
   */
  export type TopicCardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicCard
     */
    select?: TopicCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicCardInclude<ExtArgs> | null
    /**
     * Filter, which TopicCard to fetch.
     */
    where?: TopicCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TopicCards to fetch.
     */
    orderBy?: TopicCardOrderByWithRelationInput | TopicCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TopicCards.
     */
    cursor?: TopicCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `卤n` TopicCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TopicCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TopicCards.
     */
    distinct?: TopicCardScalarFieldEnum | TopicCardScalarFieldEnum[]
  }

  /**
   * TopicCard findMany
   */
  export type TopicCardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicCard
     */
    select?: TopicCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicCardInclude<ExtArgs> | null
    /**
     * Filter, which TopicCards to fetch.
     */
    where?: TopicCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TopicCards to fetch.
     */
    orderBy?: TopicCardOrderByWithRelationInput | TopicCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TopicCards.
     */
    cursor?: TopicCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `卤n` TopicCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TopicCards.
     */
    skip?: number
    distinct?: TopicCardScalarFieldEnum | TopicCardScalarFieldEnum[]
  }

  /**
   * TopicCard create
   */
  export type TopicCardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicCard
     */
    select?: TopicCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicCardInclude<ExtArgs> | null
    /**
     * The data needed to create a TopicCard.
     */
    data: XOR<TopicCardCreateInput, TopicCardUncheckedCreateInput>
  }

  /**
   * TopicCard createMany
   */
  export type TopicCardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TopicCards.
     */
    data: TopicCardCreateManyInput | TopicCardCreateManyInput[]
  }

  /**
   * TopicCard createManyAndReturn
   */
  export type TopicCardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicCard
     */
    select?: TopicCardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TopicCards.
     */
    data: TopicCardCreateManyInput | TopicCardCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicCardIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TopicCard update
   */
  export type TopicCardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicCard
     */
    select?: TopicCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicCardInclude<ExtArgs> | null
    /**
     * The data needed to update a TopicCard.
     */
    data: XOR<TopicCardUpdateInput, TopicCardUncheckedUpdateInput>
    /**
     * Choose, which TopicCard to update.
     */
    where: TopicCardWhereUniqueInput
  }

  /**
   * TopicCard updateMany
   */
  export type TopicCardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TopicCards.
     */
    data: XOR<TopicCardUpdateManyMutationInput, TopicCardUncheckedUpdateManyInput>
    /**
     * Filter which TopicCards to update
     */
    where?: TopicCardWhereInput
  }

  /**
   * TopicCard upsert
   */
  export type TopicCardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicCard
     */
    select?: TopicCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicCardInclude<ExtArgs> | null
    /**
     * The filter to search for the TopicCard to update in case it exists.
     */
    where: TopicCardWhereUniqueInput
    /**
     * In case the TopicCard found by the `where` argument doesn't exist, create a new TopicCard with this data.
     */
    create: XOR<TopicCardCreateInput, TopicCardUncheckedCreateInput>
    /**
     * In case the TopicCard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TopicCardUpdateInput, TopicCardUncheckedUpdateInput>
  }

  /**
   * TopicCard delete
   */
  export type TopicCardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicCard
     */
    select?: TopicCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicCardInclude<ExtArgs> | null
    /**
     * Filter which TopicCard to delete.
     */
    where: TopicCardWhereUniqueInput
  }

  /**
   * TopicCard deleteMany
   */
  export type TopicCardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TopicCards to delete
     */
    where?: TopicCardWhereInput
  }

  /**
   * TopicCard without action
   */
  export type TopicCardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicCard
     */
    select?: TopicCardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TopicCardInclude<ExtArgs> | null
  }


  /**
   * Model IngestedArticle
   */

  export type AggregateIngestedArticle = {
    _count: IngestedArticleCountAggregateOutputType | null
    _min: IngestedArticleMinAggregateOutputType | null
    _max: IngestedArticleMaxAggregateOutputType | null
  }

  export type IngestedArticleMinAggregateOutputType = {
    id: string | null
    createdAtUtc: Date | null
    batchId: string | null
    url: string | null
    urlCanonical: string | null
    title: string | null
    excerpt: string | null
    domain: string | null
    sourceCountry: string | null
    language: string | null
    seenDateUtc: Date | null
    rawJsonText: string | null
  }

  export type IngestedArticleMaxAggregateOutputType = {
    id: string | null
    createdAtUtc: Date | null
    batchId: string | null
    url: string | null
    urlCanonical: string | null
    title: string | null
    excerpt: string | null
    domain: string | null
    sourceCountry: string | null
    language: string | null
    seenDateUtc: Date | null
    rawJsonText: string | null
  }

  export type IngestedArticleCountAggregateOutputType = {
    id: number
    createdAtUtc: number
    batchId: number
    url: number
    urlCanonical: number
    title: number
    excerpt: number
    domain: number
    sourceCountry: number
    language: number
    seenDateUtc: number
    rawJsonText: number
    _all: number
  }


  export type IngestedArticleMinAggregateInputType = {
    id?: true
    createdAtUtc?: true
    batchId?: true
    url?: true
    urlCanonical?: true
    title?: true
    excerpt?: true
    domain?: true
    sourceCountry?: true
    language?: true
    seenDateUtc?: true
    rawJsonText?: true
  }

  export type IngestedArticleMaxAggregateInputType = {
    id?: true
    createdAtUtc?: true
    batchId?: true
    url?: true
    urlCanonical?: true
    title?: true
    excerpt?: true
    domain?: true
    sourceCountry?: true
    language?: true
    seenDateUtc?: true
    rawJsonText?: true
  }

  export type IngestedArticleCountAggregateInputType = {
    id?: true
    createdAtUtc?: true
    batchId?: true
    url?: true
    urlCanonical?: true
    title?: true
    excerpt?: true
    domain?: true
    sourceCountry?: true
    language?: true
    seenDateUtc?: true
    rawJsonText?: true
    _all?: true
  }

  export type IngestedArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IngestedArticle to aggregate.
     */
    where?: IngestedArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IngestedArticles to fetch.
     */
    orderBy?: IngestedArticleOrderByWithRelationInput | IngestedArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IngestedArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `卤n` IngestedArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IngestedArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IngestedArticles
    **/
    _count?: true | IngestedArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IngestedArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IngestedArticleMaxAggregateInputType
  }

  export type GetIngestedArticleAggregateType<T extends IngestedArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateIngestedArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIngestedArticle[P]>
      : GetScalarType<T[P], AggregateIngestedArticle[P]>
  }




  export type IngestedArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IngestedArticleWhereInput
    orderBy?: IngestedArticleOrderByWithAggregationInput | IngestedArticleOrderByWithAggregationInput[]
    by: IngestedArticleScalarFieldEnum[] | IngestedArticleScalarFieldEnum
    having?: IngestedArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IngestedArticleCountAggregateInputType | true
    _min?: IngestedArticleMinAggregateInputType
    _max?: IngestedArticleMaxAggregateInputType
  }

  export type IngestedArticleGroupByOutputType = {
    id: string
    createdAtUtc: Date
    batchId: string
    url: string
    urlCanonical: string
    title: string
    excerpt: string | null
    domain: string | null
    sourceCountry: string | null
    language: string | null
    seenDateUtc: Date | null
    rawJsonText: string
    _count: IngestedArticleCountAggregateOutputType | null
    _min: IngestedArticleMinAggregateOutputType | null
    _max: IngestedArticleMaxAggregateOutputType | null
  }

  type GetIngestedArticleGroupByPayload<T extends IngestedArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IngestedArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IngestedArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IngestedArticleGroupByOutputType[P]>
            : GetScalarType<T[P], IngestedArticleGroupByOutputType[P]>
        }
      >
    >


  export type IngestedArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAtUtc?: boolean
    batchId?: boolean
    url?: boolean
    urlCanonical?: boolean
    title?: boolean
    excerpt?: boolean
    domain?: boolean
    sourceCountry?: boolean
    language?: boolean
    seenDateUtc?: boolean
    rawJsonText?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ingestedArticle"]>

  export type IngestedArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAtUtc?: boolean
    batchId?: boolean
    url?: boolean
    urlCanonical?: boolean
    title?: boolean
    excerpt?: boolean
    domain?: boolean
    sourceCountry?: boolean
    language?: boolean
    seenDateUtc?: boolean
    rawJsonText?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ingestedArticle"]>

  export type IngestedArticleSelectScalar = {
    id?: boolean
    createdAtUtc?: boolean
    batchId?: boolean
    url?: boolean
    urlCanonical?: boolean
    title?: boolean
    excerpt?: boolean
    domain?: boolean
    sourceCountry?: boolean
    language?: boolean
    seenDateUtc?: boolean
    rawJsonText?: boolean
  }

  export type IngestedArticleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }
  export type IngestedArticleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }

  export type $IngestedArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IngestedArticle"
    objects: {
      batch: Prisma.$BatchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAtUtc: Date
      batchId: string
      url: string
      urlCanonical: string
      title: string
      excerpt: string | null
      domain: string | null
      sourceCountry: string | null
      language: string | null
      seenDateUtc: Date | null
      rawJsonText: string
    }, ExtArgs["result"]["ingestedArticle"]>
    composites: {}
  }

  type IngestedArticleGetPayload<S extends boolean | null | undefined | IngestedArticleDefaultArgs> = $Result.GetResult<Prisma.$IngestedArticlePayload, S>

  type IngestedArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<IngestedArticleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: IngestedArticleCountAggregateInputType | true
    }

  export interface IngestedArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IngestedArticle'], meta: { name: 'IngestedArticle' } }
    /**
     * Find zero or one IngestedArticle that matches the filter.
     * @param {IngestedArticleFindUniqueArgs} args - Arguments to find a IngestedArticle
     * @example
     * // Get one IngestedArticle
     * const ingestedArticle = await prisma.ingestedArticle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IngestedArticleFindUniqueArgs>(args: SelectSubset<T, IngestedArticleFindUniqueArgs<ExtArgs>>): Prisma__IngestedArticleClient<$Result.GetResult<Prisma.$IngestedArticlePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one IngestedArticle that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {IngestedArticleFindUniqueOrThrowArgs} args - Arguments to find a IngestedArticle
     * @example
     * // Get one IngestedArticle
     * const ingestedArticle = await prisma.ingestedArticle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IngestedArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, IngestedArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IngestedArticleClient<$Result.GetResult<Prisma.$IngestedArticlePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first IngestedArticle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngestedArticleFindFirstArgs} args - Arguments to find a IngestedArticle
     * @example
     * // Get one IngestedArticle
     * const ingestedArticle = await prisma.ingestedArticle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IngestedArticleFindFirstArgs>(args?: SelectSubset<T, IngestedArticleFindFirstArgs<ExtArgs>>): Prisma__IngestedArticleClient<$Result.GetResult<Prisma.$IngestedArticlePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first IngestedArticle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngestedArticleFindFirstOrThrowArgs} args - Arguments to find a IngestedArticle
     * @example
     * // Get one IngestedArticle
     * const ingestedArticle = await prisma.ingestedArticle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IngestedArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, IngestedArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__IngestedArticleClient<$Result.GetResult<Prisma.$IngestedArticlePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more IngestedArticles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngestedArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IngestedArticles
     * const ingestedArticles = await prisma.ingestedArticle.findMany()
     * 
     * // Get first 10 IngestedArticles
     * const ingestedArticles = await prisma.ingestedArticle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ingestedArticleWithIdOnly = await prisma.ingestedArticle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IngestedArticleFindManyArgs>(args?: SelectSubset<T, IngestedArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngestedArticlePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a IngestedArticle.
     * @param {IngestedArticleCreateArgs} args - Arguments to create a IngestedArticle.
     * @example
     * // Create one IngestedArticle
     * const IngestedArticle = await prisma.ingestedArticle.create({
     *   data: {
     *     // ... data to create a IngestedArticle
     *   }
     * })
     * 
     */
    create<T extends IngestedArticleCreateArgs>(args: SelectSubset<T, IngestedArticleCreateArgs<ExtArgs>>): Prisma__IngestedArticleClient<$Result.GetResult<Prisma.$IngestedArticlePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many IngestedArticles.
     * @param {IngestedArticleCreateManyArgs} args - Arguments to create many IngestedArticles.
     * @example
     * // Create many IngestedArticles
     * const ingestedArticle = await prisma.ingestedArticle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IngestedArticleCreateManyArgs>(args?: SelectSubset<T, IngestedArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IngestedArticles and returns the data saved in the database.
     * @param {IngestedArticleCreateManyAndReturnArgs} args - Arguments to create many IngestedArticles.
     * @example
     * // Create many IngestedArticles
     * const ingestedArticle = await prisma.ingestedArticle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IngestedArticles and only return the `id`
     * const ingestedArticleWithIdOnly = await prisma.ingestedArticle.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IngestedArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, IngestedArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngestedArticlePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a IngestedArticle.
     * @param {IngestedArticleDeleteArgs} args - Arguments to delete one IngestedArticle.
     * @example
     * // Delete one IngestedArticle
     * const IngestedArticle = await prisma.ingestedArticle.delete({
     *   where: {
     *     // ... filter to delete one IngestedArticle
     *   }
     * })
     * 
     */
    delete<T extends IngestedArticleDeleteArgs>(args: SelectSubset<T, IngestedArticleDeleteArgs<ExtArgs>>): Prisma__IngestedArticleClient<$Result.GetResult<Prisma.$IngestedArticlePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one IngestedArticle.
     * @param {IngestedArticleUpdateArgs} args - Arguments to update one IngestedArticle.
     * @example
     * // Update one IngestedArticle
     * const ingestedArticle = await prisma.ingestedArticle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IngestedArticleUpdateArgs>(args: SelectSubset<T, IngestedArticleUpdateArgs<ExtArgs>>): Prisma__IngestedArticleClient<$Result.GetResult<Prisma.$IngestedArticlePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more IngestedArticles.
     * @param {IngestedArticleDeleteManyArgs} args - Arguments to filter IngestedArticles to delete.
     * @example
     * // Delete a few IngestedArticles
     * const { count } = await prisma.ingestedArticle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IngestedArticleDeleteManyArgs>(args?: SelectSubset<T, IngestedArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IngestedArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngestedArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IngestedArticles
     * const ingestedArticle = await prisma.ingestedArticle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IngestedArticleUpdateManyArgs>(args: SelectSubset<T, IngestedArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one IngestedArticle.
     * @param {IngestedArticleUpsertArgs} args - Arguments to update or create a IngestedArticle.
     * @example
     * // Update or create a IngestedArticle
     * const ingestedArticle = await prisma.ingestedArticle.upsert({
     *   create: {
     *     // ... data to create a IngestedArticle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IngestedArticle we want to update
     *   }
     * })
     */
    upsert<T extends IngestedArticleUpsertArgs>(args: SelectSubset<T, IngestedArticleUpsertArgs<ExtArgs>>): Prisma__IngestedArticleClient<$Result.GetResult<Prisma.$IngestedArticlePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of IngestedArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngestedArticleCountArgs} args - Arguments to filter IngestedArticles to count.
     * @example
     * // Count the number of IngestedArticles
     * const count = await prisma.ingestedArticle.count({
     *   where: {
     *     // ... the filter for the IngestedArticles we want to count
     *   }
     * })
    **/
    count<T extends IngestedArticleCountArgs>(
      args?: Subset<T, IngestedArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IngestedArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IngestedArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngestedArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IngestedArticleAggregateArgs>(args: Subset<T, IngestedArticleAggregateArgs>): Prisma.PrismaPromise<GetIngestedArticleAggregateType<T>>

    /**
     * Group by IngestedArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngestedArticleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IngestedArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IngestedArticleGroupByArgs['orderBy'] }
        : { orderBy?: IngestedArticleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IngestedArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIngestedArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IngestedArticle model
   */
  readonly fields: IngestedArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IngestedArticle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IngestedArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    batch<T extends BatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BatchDefaultArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IngestedArticle model
   */ 
  interface IngestedArticleFieldRefs {
    readonly id: FieldRef<"IngestedArticle", 'String'>
    readonly createdAtUtc: FieldRef<"IngestedArticle", 'DateTime'>
    readonly batchId: FieldRef<"IngestedArticle", 'String'>
    readonly url: FieldRef<"IngestedArticle", 'String'>
    readonly urlCanonical: FieldRef<"IngestedArticle", 'String'>
    readonly title: FieldRef<"IngestedArticle", 'String'>
    readonly excerpt: FieldRef<"IngestedArticle", 'String'>
    readonly domain: FieldRef<"IngestedArticle", 'String'>
    readonly sourceCountry: FieldRef<"IngestedArticle", 'String'>
    readonly language: FieldRef<"IngestedArticle", 'String'>
    readonly seenDateUtc: FieldRef<"IngestedArticle", 'DateTime'>
    readonly rawJsonText: FieldRef<"IngestedArticle", 'String'>
  }
    

  // Custom InputTypes
  /**
   * IngestedArticle findUnique
   */
  export type IngestedArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestedArticle
     */
    select?: IngestedArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestedArticleInclude<ExtArgs> | null
    /**
     * Filter, which IngestedArticle to fetch.
     */
    where: IngestedArticleWhereUniqueInput
  }

  /**
   * IngestedArticle findUniqueOrThrow
   */
  export type IngestedArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestedArticle
     */
    select?: IngestedArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestedArticleInclude<ExtArgs> | null
    /**
     * Filter, which IngestedArticle to fetch.
     */
    where: IngestedArticleWhereUniqueInput
  }

  /**
   * IngestedArticle findFirst
   */
  export type IngestedArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestedArticle
     */
    select?: IngestedArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestedArticleInclude<ExtArgs> | null
    /**
     * Filter, which IngestedArticle to fetch.
     */
    where?: IngestedArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IngestedArticles to fetch.
     */
    orderBy?: IngestedArticleOrderByWithRelationInput | IngestedArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IngestedArticles.
     */
    cursor?: IngestedArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `卤n` IngestedArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IngestedArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IngestedArticles.
     */
    distinct?: IngestedArticleScalarFieldEnum | IngestedArticleScalarFieldEnum[]
  }

  /**
   * IngestedArticle findFirstOrThrow
   */
  export type IngestedArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestedArticle
     */
    select?: IngestedArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestedArticleInclude<ExtArgs> | null
    /**
     * Filter, which IngestedArticle to fetch.
     */
    where?: IngestedArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IngestedArticles to fetch.
     */
    orderBy?: IngestedArticleOrderByWithRelationInput | IngestedArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IngestedArticles.
     */
    cursor?: IngestedArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `卤n` IngestedArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IngestedArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IngestedArticles.
     */
    distinct?: IngestedArticleScalarFieldEnum | IngestedArticleScalarFieldEnum[]
  }

  /**
   * IngestedArticle findMany
   */
  export type IngestedArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestedArticle
     */
    select?: IngestedArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestedArticleInclude<ExtArgs> | null
    /**
     * Filter, which IngestedArticles to fetch.
     */
    where?: IngestedArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IngestedArticles to fetch.
     */
    orderBy?: IngestedArticleOrderByWithRelationInput | IngestedArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IngestedArticles.
     */
    cursor?: IngestedArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `卤n` IngestedArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IngestedArticles.
     */
    skip?: number
    distinct?: IngestedArticleScalarFieldEnum | IngestedArticleScalarFieldEnum[]
  }

  /**
   * IngestedArticle create
   */
  export type IngestedArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestedArticle
     */
    select?: IngestedArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestedArticleInclude<ExtArgs> | null
    /**
     * The data needed to create a IngestedArticle.
     */
    data: XOR<IngestedArticleCreateInput, IngestedArticleUncheckedCreateInput>
  }

  /**
   * IngestedArticle createMany
   */
  export type IngestedArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IngestedArticles.
     */
    data: IngestedArticleCreateManyInput | IngestedArticleCreateManyInput[]
  }

  /**
   * IngestedArticle createManyAndReturn
   */
  export type IngestedArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestedArticle
     */
    select?: IngestedArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many IngestedArticles.
     */
    data: IngestedArticleCreateManyInput | IngestedArticleCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestedArticleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * IngestedArticle update
   */
  export type IngestedArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestedArticle
     */
    select?: IngestedArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestedArticleInclude<ExtArgs> | null
    /**
     * The data needed to update a IngestedArticle.
     */
    data: XOR<IngestedArticleUpdateInput, IngestedArticleUncheckedUpdateInput>
    /**
     * Choose, which IngestedArticle to update.
     */
    where: IngestedArticleWhereUniqueInput
  }

  /**
   * IngestedArticle updateMany
   */
  export type IngestedArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IngestedArticles.
     */
    data: XOR<IngestedArticleUpdateManyMutationInput, IngestedArticleUncheckedUpdateManyInput>
    /**
     * Filter which IngestedArticles to update
     */
    where?: IngestedArticleWhereInput
  }

  /**
   * IngestedArticle upsert
   */
  export type IngestedArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestedArticle
     */
    select?: IngestedArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestedArticleInclude<ExtArgs> | null
    /**
     * The filter to search for the IngestedArticle to update in case it exists.
     */
    where: IngestedArticleWhereUniqueInput
    /**
     * In case the IngestedArticle found by the `where` argument doesn't exist, create a new IngestedArticle with this data.
     */
    create: XOR<IngestedArticleCreateInput, IngestedArticleUncheckedCreateInput>
    /**
     * In case the IngestedArticle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IngestedArticleUpdateInput, IngestedArticleUncheckedUpdateInput>
  }

  /**
   * IngestedArticle delete
   */
  export type IngestedArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestedArticle
     */
    select?: IngestedArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestedArticleInclude<ExtArgs> | null
    /**
     * Filter which IngestedArticle to delete.
     */
    where: IngestedArticleWhereUniqueInput
  }

  /**
   * IngestedArticle deleteMany
   */
  export type IngestedArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IngestedArticles to delete
     */
    where?: IngestedArticleWhereInput
  }

  /**
   * IngestedArticle without action
   */
  export type IngestedArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngestedArticle
     */
    select?: IngestedArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngestedArticleInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BatchScalarFieldEnum: {
    id: 'id',
    createdAtUtc: 'createdAtUtc',
    windowStartUtc: 'windowStartUtc',
    windowEndUtc: 'windowEndUtc',
    status: 'status',
    error: 'error',
    gdeltQuery: 'gdeltQuery',
    gdeltUrl: 'gdeltUrl',
    articleCount: 'articleCount',
    europeArticleCount: 'europeArticleCount',
    supplementLinksText: 'supplementLinksText'
  };

  export type BatchScalarFieldEnum = (typeof BatchScalarFieldEnum)[keyof typeof BatchScalarFieldEnum]


  export const TopicCardScalarFieldEnum: {
    id: 'id',
    createdAtUtc: 'createdAtUtc',
    batchId: 'batchId',
    rank: 'rank',
    score: 'score',
    clusterKey: 'clusterKey',
    cardJsonText: 'cardJsonText'
  };

  export type TopicCardScalarFieldEnum = (typeof TopicCardScalarFieldEnum)[keyof typeof TopicCardScalarFieldEnum]


  export const IngestedArticleScalarFieldEnum: {
    id: 'id',
    createdAtUtc: 'createdAtUtc',
    batchId: 'batchId',
    url: 'url',
    urlCanonical: 'urlCanonical',
    title: 'title',
    excerpt: 'excerpt',
    domain: 'domain',
    sourceCountry: 'sourceCountry',
    language: 'language',
    seenDateUtc: 'seenDateUtc',
    rawJsonText: 'rawJsonText'
  };

  export type IngestedArticleScalarFieldEnum = (typeof IngestedArticleScalarFieldEnum)[keyof typeof IngestedArticleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type BatchWhereInput = {
    AND?: BatchWhereInput | BatchWhereInput[]
    OR?: BatchWhereInput[]
    NOT?: BatchWhereInput | BatchWhereInput[]
    id?: StringFilter<"Batch"> | string
    createdAtUtc?: DateTimeFilter<"Batch"> | Date | string
    windowStartUtc?: DateTimeFilter<"Batch"> | Date | string
    windowEndUtc?: DateTimeFilter<"Batch"> | Date | string
    status?: StringFilter<"Batch"> | string
    error?: StringNullableFilter<"Batch"> | string | null
    gdeltQuery?: StringFilter<"Batch"> | string
    gdeltUrl?: StringFilter<"Batch"> | string
    articleCount?: IntFilter<"Batch"> | number
    europeArticleCount?: IntFilter<"Batch"> | number
    supplementLinksText?: StringNullableFilter<"Batch"> | string | null
    cards?: TopicCardListRelationFilter
    articles?: IngestedArticleListRelationFilter
  }

  export type BatchOrderByWithRelationInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    windowStartUtc?: SortOrder
    windowEndUtc?: SortOrder
    status?: SortOrder
    error?: SortOrderInput | SortOrder
    gdeltQuery?: SortOrder
    gdeltUrl?: SortOrder
    articleCount?: SortOrder
    europeArticleCount?: SortOrder
    supplementLinksText?: SortOrderInput | SortOrder
    cards?: TopicCardOrderByRelationAggregateInput
    articles?: IngestedArticleOrderByRelationAggregateInput
  }

  export type BatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BatchWhereInput | BatchWhereInput[]
    OR?: BatchWhereInput[]
    NOT?: BatchWhereInput | BatchWhereInput[]
    createdAtUtc?: DateTimeFilter<"Batch"> | Date | string
    windowStartUtc?: DateTimeFilter<"Batch"> | Date | string
    windowEndUtc?: DateTimeFilter<"Batch"> | Date | string
    status?: StringFilter<"Batch"> | string
    error?: StringNullableFilter<"Batch"> | string | null
    gdeltQuery?: StringFilter<"Batch"> | string
    gdeltUrl?: StringFilter<"Batch"> | string
    articleCount?: IntFilter<"Batch"> | number
    europeArticleCount?: IntFilter<"Batch"> | number
    supplementLinksText?: StringNullableFilter<"Batch"> | string | null
    cards?: TopicCardListRelationFilter
    articles?: IngestedArticleListRelationFilter
  }, "id">

  export type BatchOrderByWithAggregationInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    windowStartUtc?: SortOrder
    windowEndUtc?: SortOrder
    status?: SortOrder
    error?: SortOrderInput | SortOrder
    gdeltQuery?: SortOrder
    gdeltUrl?: SortOrder
    articleCount?: SortOrder
    europeArticleCount?: SortOrder
    supplementLinksText?: SortOrderInput | SortOrder
    _count?: BatchCountOrderByAggregateInput
    _avg?: BatchAvgOrderByAggregateInput
    _max?: BatchMaxOrderByAggregateInput
    _min?: BatchMinOrderByAggregateInput
    _sum?: BatchSumOrderByAggregateInput
  }

  export type BatchScalarWhereWithAggregatesInput = {
    AND?: BatchScalarWhereWithAggregatesInput | BatchScalarWhereWithAggregatesInput[]
    OR?: BatchScalarWhereWithAggregatesInput[]
    NOT?: BatchScalarWhereWithAggregatesInput | BatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Batch"> | string
    createdAtUtc?: DateTimeWithAggregatesFilter<"Batch"> | Date | string
    windowStartUtc?: DateTimeWithAggregatesFilter<"Batch"> | Date | string
    windowEndUtc?: DateTimeWithAggregatesFilter<"Batch"> | Date | string
    status?: StringWithAggregatesFilter<"Batch"> | string
    error?: StringNullableWithAggregatesFilter<"Batch"> | string | null
    gdeltQuery?: StringWithAggregatesFilter<"Batch"> | string
    gdeltUrl?: StringWithAggregatesFilter<"Batch"> | string
    articleCount?: IntWithAggregatesFilter<"Batch"> | number
    europeArticleCount?: IntWithAggregatesFilter<"Batch"> | number
    supplementLinksText?: StringNullableWithAggregatesFilter<"Batch"> | string | null
  }

  export type TopicCardWhereInput = {
    AND?: TopicCardWhereInput | TopicCardWhereInput[]
    OR?: TopicCardWhereInput[]
    NOT?: TopicCardWhereInput | TopicCardWhereInput[]
    id?: StringFilter<"TopicCard"> | string
    createdAtUtc?: DateTimeFilter<"TopicCard"> | Date | string
    batchId?: StringFilter<"TopicCard"> | string
    rank?: IntFilter<"TopicCard"> | number
    score?: FloatFilter<"TopicCard"> | number
    clusterKey?: StringFilter<"TopicCard"> | string
    cardJsonText?: StringFilter<"TopicCard"> | string
    batch?: XOR<BatchRelationFilter, BatchWhereInput>
  }

  export type TopicCardOrderByWithRelationInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    batchId?: SortOrder
    rank?: SortOrder
    score?: SortOrder
    clusterKey?: SortOrder
    cardJsonText?: SortOrder
    batch?: BatchOrderByWithRelationInput
  }

  export type TopicCardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    batchId_rank?: TopicCardBatchIdRankCompoundUniqueInput
    AND?: TopicCardWhereInput | TopicCardWhereInput[]
    OR?: TopicCardWhereInput[]
    NOT?: TopicCardWhereInput | TopicCardWhereInput[]
    createdAtUtc?: DateTimeFilter<"TopicCard"> | Date | string
    batchId?: StringFilter<"TopicCard"> | string
    rank?: IntFilter<"TopicCard"> | number
    score?: FloatFilter<"TopicCard"> | number
    clusterKey?: StringFilter<"TopicCard"> | string
    cardJsonText?: StringFilter<"TopicCard"> | string
    batch?: XOR<BatchRelationFilter, BatchWhereInput>
  }, "id" | "batchId_rank">

  export type TopicCardOrderByWithAggregationInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    batchId?: SortOrder
    rank?: SortOrder
    score?: SortOrder
    clusterKey?: SortOrder
    cardJsonText?: SortOrder
    _count?: TopicCardCountOrderByAggregateInput
    _avg?: TopicCardAvgOrderByAggregateInput
    _max?: TopicCardMaxOrderByAggregateInput
    _min?: TopicCardMinOrderByAggregateInput
    _sum?: TopicCardSumOrderByAggregateInput
  }

  export type TopicCardScalarWhereWithAggregatesInput = {
    AND?: TopicCardScalarWhereWithAggregatesInput | TopicCardScalarWhereWithAggregatesInput[]
    OR?: TopicCardScalarWhereWithAggregatesInput[]
    NOT?: TopicCardScalarWhereWithAggregatesInput | TopicCardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TopicCard"> | string
    createdAtUtc?: DateTimeWithAggregatesFilter<"TopicCard"> | Date | string
    batchId?: StringWithAggregatesFilter<"TopicCard"> | string
    rank?: IntWithAggregatesFilter<"TopicCard"> | number
    score?: FloatWithAggregatesFilter<"TopicCard"> | number
    clusterKey?: StringWithAggregatesFilter<"TopicCard"> | string
    cardJsonText?: StringWithAggregatesFilter<"TopicCard"> | string
  }

  export type IngestedArticleWhereInput = {
    AND?: IngestedArticleWhereInput | IngestedArticleWhereInput[]
    OR?: IngestedArticleWhereInput[]
    NOT?: IngestedArticleWhereInput | IngestedArticleWhereInput[]
    id?: StringFilter<"IngestedArticle"> | string
    createdAtUtc?: DateTimeFilter<"IngestedArticle"> | Date | string
    batchId?: StringFilter<"IngestedArticle"> | string
    url?: StringFilter<"IngestedArticle"> | string
    urlCanonical?: StringFilter<"IngestedArticle"> | string
    title?: StringFilter<"IngestedArticle"> | string
    excerpt?: StringNullableFilter<"IngestedArticle"> | string | null
    domain?: StringNullableFilter<"IngestedArticle"> | string | null
    sourceCountry?: StringNullableFilter<"IngestedArticle"> | string | null
    language?: StringNullableFilter<"IngestedArticle"> | string | null
    seenDateUtc?: DateTimeNullableFilter<"IngestedArticle"> | Date | string | null
    rawJsonText?: StringFilter<"IngestedArticle"> | string
    batch?: XOR<BatchRelationFilter, BatchWhereInput>
  }

  export type IngestedArticleOrderByWithRelationInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    batchId?: SortOrder
    url?: SortOrder
    urlCanonical?: SortOrder
    title?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    domain?: SortOrderInput | SortOrder
    sourceCountry?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    seenDateUtc?: SortOrderInput | SortOrder
    rawJsonText?: SortOrder
    batch?: BatchOrderByWithRelationInput
  }

  export type IngestedArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    batchId_urlCanonical?: IngestedArticleBatchIdUrlCanonicalCompoundUniqueInput
    AND?: IngestedArticleWhereInput | IngestedArticleWhereInput[]
    OR?: IngestedArticleWhereInput[]
    NOT?: IngestedArticleWhereInput | IngestedArticleWhereInput[]
    createdAtUtc?: DateTimeFilter<"IngestedArticle"> | Date | string
    batchId?: StringFilter<"IngestedArticle"> | string
    url?: StringFilter<"IngestedArticle"> | string
    urlCanonical?: StringFilter<"IngestedArticle"> | string
    title?: StringFilter<"IngestedArticle"> | string
    excerpt?: StringNullableFilter<"IngestedArticle"> | string | null
    domain?: StringNullableFilter<"IngestedArticle"> | string | null
    sourceCountry?: StringNullableFilter<"IngestedArticle"> | string | null
    language?: StringNullableFilter<"IngestedArticle"> | string | null
    seenDateUtc?: DateTimeNullableFilter<"IngestedArticle"> | Date | string | null
    rawJsonText?: StringFilter<"IngestedArticle"> | string
    batch?: XOR<BatchRelationFilter, BatchWhereInput>
  }, "id" | "batchId_urlCanonical">

  export type IngestedArticleOrderByWithAggregationInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    batchId?: SortOrder
    url?: SortOrder
    urlCanonical?: SortOrder
    title?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    domain?: SortOrderInput | SortOrder
    sourceCountry?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    seenDateUtc?: SortOrderInput | SortOrder
    rawJsonText?: SortOrder
    _count?: IngestedArticleCountOrderByAggregateInput
    _max?: IngestedArticleMaxOrderByAggregateInput
    _min?: IngestedArticleMinOrderByAggregateInput
  }

  export type IngestedArticleScalarWhereWithAggregatesInput = {
    AND?: IngestedArticleScalarWhereWithAggregatesInput | IngestedArticleScalarWhereWithAggregatesInput[]
    OR?: IngestedArticleScalarWhereWithAggregatesInput[]
    NOT?: IngestedArticleScalarWhereWithAggregatesInput | IngestedArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IngestedArticle"> | string
    createdAtUtc?: DateTimeWithAggregatesFilter<"IngestedArticle"> | Date | string
    batchId?: StringWithAggregatesFilter<"IngestedArticle"> | string
    url?: StringWithAggregatesFilter<"IngestedArticle"> | string
    urlCanonical?: StringWithAggregatesFilter<"IngestedArticle"> | string
    title?: StringWithAggregatesFilter<"IngestedArticle"> | string
    excerpt?: StringNullableWithAggregatesFilter<"IngestedArticle"> | string | null
    domain?: StringNullableWithAggregatesFilter<"IngestedArticle"> | string | null
    sourceCountry?: StringNullableWithAggregatesFilter<"IngestedArticle"> | string | null
    language?: StringNullableWithAggregatesFilter<"IngestedArticle"> | string | null
    seenDateUtc?: DateTimeNullableWithAggregatesFilter<"IngestedArticle"> | Date | string | null
    rawJsonText?: StringWithAggregatesFilter<"IngestedArticle"> | string
  }

  export type BatchCreateInput = {
    id: string
    createdAtUtc?: Date | string
    windowStartUtc: Date | string
    windowEndUtc: Date | string
    status: string
    error?: string | null
    gdeltQuery: string
    gdeltUrl: string
    articleCount: number
    europeArticleCount: number
    supplementLinksText?: string | null
    cards?: TopicCardCreateNestedManyWithoutBatchInput
    articles?: IngestedArticleCreateNestedManyWithoutBatchInput
  }

  export type BatchUncheckedCreateInput = {
    id: string
    createdAtUtc?: Date | string
    windowStartUtc: Date | string
    windowEndUtc: Date | string
    status: string
    error?: string | null
    gdeltQuery: string
    gdeltUrl: string
    articleCount: number
    europeArticleCount: number
    supplementLinksText?: string | null
    cards?: TopicCardUncheckedCreateNestedManyWithoutBatchInput
    articles?: IngestedArticleUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowStartUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEndUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    gdeltQuery?: StringFieldUpdateOperationsInput | string
    gdeltUrl?: StringFieldUpdateOperationsInput | string
    articleCount?: IntFieldUpdateOperationsInput | number
    europeArticleCount?: IntFieldUpdateOperationsInput | number
    supplementLinksText?: NullableStringFieldUpdateOperationsInput | string | null
    cards?: TopicCardUpdateManyWithoutBatchNestedInput
    articles?: IngestedArticleUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowStartUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEndUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    gdeltQuery?: StringFieldUpdateOperationsInput | string
    gdeltUrl?: StringFieldUpdateOperationsInput | string
    articleCount?: IntFieldUpdateOperationsInput | number
    europeArticleCount?: IntFieldUpdateOperationsInput | number
    supplementLinksText?: NullableStringFieldUpdateOperationsInput | string | null
    cards?: TopicCardUncheckedUpdateManyWithoutBatchNestedInput
    articles?: IngestedArticleUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type BatchCreateManyInput = {
    id: string
    createdAtUtc?: Date | string
    windowStartUtc: Date | string
    windowEndUtc: Date | string
    status: string
    error?: string | null
    gdeltQuery: string
    gdeltUrl: string
    articleCount: number
    europeArticleCount: number
    supplementLinksText?: string | null
  }

  export type BatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowStartUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEndUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    gdeltQuery?: StringFieldUpdateOperationsInput | string
    gdeltUrl?: StringFieldUpdateOperationsInput | string
    articleCount?: IntFieldUpdateOperationsInput | number
    europeArticleCount?: IntFieldUpdateOperationsInput | number
    supplementLinksText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowStartUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEndUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    gdeltQuery?: StringFieldUpdateOperationsInput | string
    gdeltUrl?: StringFieldUpdateOperationsInput | string
    articleCount?: IntFieldUpdateOperationsInput | number
    europeArticleCount?: IntFieldUpdateOperationsInput | number
    supplementLinksText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TopicCardCreateInput = {
    id?: string
    createdAtUtc?: Date | string
    rank: number
    score: number
    clusterKey: string
    cardJsonText: string
    batch: BatchCreateNestedOneWithoutCardsInput
  }

  export type TopicCardUncheckedCreateInput = {
    id?: string
    createdAtUtc?: Date | string
    batchId: string
    rank: number
    score: number
    clusterKey: string
    cardJsonText: string
  }

  export type TopicCardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    clusterKey?: StringFieldUpdateOperationsInput | string
    cardJsonText?: StringFieldUpdateOperationsInput | string
    batch?: BatchUpdateOneRequiredWithoutCardsNestedInput
  }

  export type TopicCardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    batchId?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    clusterKey?: StringFieldUpdateOperationsInput | string
    cardJsonText?: StringFieldUpdateOperationsInput | string
  }

  export type TopicCardCreateManyInput = {
    id?: string
    createdAtUtc?: Date | string
    batchId: string
    rank: number
    score: number
    clusterKey: string
    cardJsonText: string
  }

  export type TopicCardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    clusterKey?: StringFieldUpdateOperationsInput | string
    cardJsonText?: StringFieldUpdateOperationsInput | string
  }

  export type TopicCardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    batchId?: StringFieldUpdateOperationsInput | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    clusterKey?: StringFieldUpdateOperationsInput | string
    cardJsonText?: StringFieldUpdateOperationsInput | string
  }

  export type IngestedArticleCreateInput = {
    id?: string
    createdAtUtc?: Date | string
    url: string
    urlCanonical: string
    title: string
    excerpt?: string | null
    domain?: string | null
    sourceCountry?: string | null
    language?: string | null
    seenDateUtc?: Date | string | null
    rawJsonText: string
    batch: BatchCreateNestedOneWithoutArticlesInput
  }

  export type IngestedArticleUncheckedCreateInput = {
    id?: string
    createdAtUtc?: Date | string
    batchId: string
    url: string
    urlCanonical: string
    title: string
    excerpt?: string | null
    domain?: string | null
    sourceCountry?: string | null
    language?: string | null
    seenDateUtc?: Date | string | null
    rawJsonText: string
  }

  export type IngestedArticleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    urlCanonical?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    sourceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    seenDateUtc?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawJsonText?: StringFieldUpdateOperationsInput | string
    batch?: BatchUpdateOneRequiredWithoutArticlesNestedInput
  }

  export type IngestedArticleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    batchId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlCanonical?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    sourceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    seenDateUtc?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawJsonText?: StringFieldUpdateOperationsInput | string
  }

  export type IngestedArticleCreateManyInput = {
    id?: string
    createdAtUtc?: Date | string
    batchId: string
    url: string
    urlCanonical: string
    title: string
    excerpt?: string | null
    domain?: string | null
    sourceCountry?: string | null
    language?: string | null
    seenDateUtc?: Date | string | null
    rawJsonText: string
  }

  export type IngestedArticleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    urlCanonical?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    sourceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    seenDateUtc?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawJsonText?: StringFieldUpdateOperationsInput | string
  }

  export type IngestedArticleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    batchId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlCanonical?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    sourceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    seenDateUtc?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawJsonText?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TopicCardListRelationFilter = {
    every?: TopicCardWhereInput
    some?: TopicCardWhereInput
    none?: TopicCardWhereInput
  }

  export type IngestedArticleListRelationFilter = {
    every?: IngestedArticleWhereInput
    some?: IngestedArticleWhereInput
    none?: IngestedArticleWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TopicCardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IngestedArticleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BatchCountOrderByAggregateInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    windowStartUtc?: SortOrder
    windowEndUtc?: SortOrder
    status?: SortOrder
    error?: SortOrder
    gdeltQuery?: SortOrder
    gdeltUrl?: SortOrder
    articleCount?: SortOrder
    europeArticleCount?: SortOrder
    supplementLinksText?: SortOrder
  }

  export type BatchAvgOrderByAggregateInput = {
    articleCount?: SortOrder
    europeArticleCount?: SortOrder
  }

  export type BatchMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    windowStartUtc?: SortOrder
    windowEndUtc?: SortOrder
    status?: SortOrder
    error?: SortOrder
    gdeltQuery?: SortOrder
    gdeltUrl?: SortOrder
    articleCount?: SortOrder
    europeArticleCount?: SortOrder
    supplementLinksText?: SortOrder
  }

  export type BatchMinOrderByAggregateInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    windowStartUtc?: SortOrder
    windowEndUtc?: SortOrder
    status?: SortOrder
    error?: SortOrder
    gdeltQuery?: SortOrder
    gdeltUrl?: SortOrder
    articleCount?: SortOrder
    europeArticleCount?: SortOrder
    supplementLinksText?: SortOrder
  }

  export type BatchSumOrderByAggregateInput = {
    articleCount?: SortOrder
    europeArticleCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BatchRelationFilter = {
    is?: BatchWhereInput
    isNot?: BatchWhereInput
  }

  export type TopicCardBatchIdRankCompoundUniqueInput = {
    batchId: string
    rank: number
  }

  export type TopicCardCountOrderByAggregateInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    batchId?: SortOrder
    rank?: SortOrder
    score?: SortOrder
    clusterKey?: SortOrder
    cardJsonText?: SortOrder
  }

  export type TopicCardAvgOrderByAggregateInput = {
    rank?: SortOrder
    score?: SortOrder
  }

  export type TopicCardMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    batchId?: SortOrder
    rank?: SortOrder
    score?: SortOrder
    clusterKey?: SortOrder
    cardJsonText?: SortOrder
  }

  export type TopicCardMinOrderByAggregateInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    batchId?: SortOrder
    rank?: SortOrder
    score?: SortOrder
    clusterKey?: SortOrder
    cardJsonText?: SortOrder
  }

  export type TopicCardSumOrderByAggregateInput = {
    rank?: SortOrder
    score?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IngestedArticleBatchIdUrlCanonicalCompoundUniqueInput = {
    batchId: string
    urlCanonical: string
  }

  export type IngestedArticleCountOrderByAggregateInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    batchId?: SortOrder
    url?: SortOrder
    urlCanonical?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    domain?: SortOrder
    sourceCountry?: SortOrder
    language?: SortOrder
    seenDateUtc?: SortOrder
    rawJsonText?: SortOrder
  }

  export type IngestedArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    batchId?: SortOrder
    url?: SortOrder
    urlCanonical?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    domain?: SortOrder
    sourceCountry?: SortOrder
    language?: SortOrder
    seenDateUtc?: SortOrder
    rawJsonText?: SortOrder
  }

  export type IngestedArticleMinOrderByAggregateInput = {
    id?: SortOrder
    createdAtUtc?: SortOrder
    batchId?: SortOrder
    url?: SortOrder
    urlCanonical?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    domain?: SortOrder
    sourceCountry?: SortOrder
    language?: SortOrder
    seenDateUtc?: SortOrder
    rawJsonText?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TopicCardCreateNestedManyWithoutBatchInput = {
    create?: XOR<TopicCardCreateWithoutBatchInput, TopicCardUncheckedCreateWithoutBatchInput> | TopicCardCreateWithoutBatchInput[] | TopicCardUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: TopicCardCreateOrConnectWithoutBatchInput | TopicCardCreateOrConnectWithoutBatchInput[]
    createMany?: TopicCardCreateManyBatchInputEnvelope
    connect?: TopicCardWhereUniqueInput | TopicCardWhereUniqueInput[]
  }

  export type IngestedArticleCreateNestedManyWithoutBatchInput = {
    create?: XOR<IngestedArticleCreateWithoutBatchInput, IngestedArticleUncheckedCreateWithoutBatchInput> | IngestedArticleCreateWithoutBatchInput[] | IngestedArticleUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: IngestedArticleCreateOrConnectWithoutBatchInput | IngestedArticleCreateOrConnectWithoutBatchInput[]
    createMany?: IngestedArticleCreateManyBatchInputEnvelope
    connect?: IngestedArticleWhereUniqueInput | IngestedArticleWhereUniqueInput[]
  }

  export type TopicCardUncheckedCreateNestedManyWithoutBatchInput = {
    create?: XOR<TopicCardCreateWithoutBatchInput, TopicCardUncheckedCreateWithoutBatchInput> | TopicCardCreateWithoutBatchInput[] | TopicCardUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: TopicCardCreateOrConnectWithoutBatchInput | TopicCardCreateOrConnectWithoutBatchInput[]
    createMany?: TopicCardCreateManyBatchInputEnvelope
    connect?: TopicCardWhereUniqueInput | TopicCardWhereUniqueInput[]
  }

  export type IngestedArticleUncheckedCreateNestedManyWithoutBatchInput = {
    create?: XOR<IngestedArticleCreateWithoutBatchInput, IngestedArticleUncheckedCreateWithoutBatchInput> | IngestedArticleCreateWithoutBatchInput[] | IngestedArticleUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: IngestedArticleCreateOrConnectWithoutBatchInput | IngestedArticleCreateOrConnectWithoutBatchInput[]
    createMany?: IngestedArticleCreateManyBatchInputEnvelope
    connect?: IngestedArticleWhereUniqueInput | IngestedArticleWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TopicCardUpdateManyWithoutBatchNestedInput = {
    create?: XOR<TopicCardCreateWithoutBatchInput, TopicCardUncheckedCreateWithoutBatchInput> | TopicCardCreateWithoutBatchInput[] | TopicCardUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: TopicCardCreateOrConnectWithoutBatchInput | TopicCardCreateOrConnectWithoutBatchInput[]
    upsert?: TopicCardUpsertWithWhereUniqueWithoutBatchInput | TopicCardUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: TopicCardCreateManyBatchInputEnvelope
    set?: TopicCardWhereUniqueInput | TopicCardWhereUniqueInput[]
    disconnect?: TopicCardWhereUniqueInput | TopicCardWhereUniqueInput[]
    delete?: TopicCardWhereUniqueInput | TopicCardWhereUniqueInput[]
    connect?: TopicCardWhereUniqueInput | TopicCardWhereUniqueInput[]
    update?: TopicCardUpdateWithWhereUniqueWithoutBatchInput | TopicCardUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: TopicCardUpdateManyWithWhereWithoutBatchInput | TopicCardUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: TopicCardScalarWhereInput | TopicCardScalarWhereInput[]
  }

  export type IngestedArticleUpdateManyWithoutBatchNestedInput = {
    create?: XOR<IngestedArticleCreateWithoutBatchInput, IngestedArticleUncheckedCreateWithoutBatchInput> | IngestedArticleCreateWithoutBatchInput[] | IngestedArticleUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: IngestedArticleCreateOrConnectWithoutBatchInput | IngestedArticleCreateOrConnectWithoutBatchInput[]
    upsert?: IngestedArticleUpsertWithWhereUniqueWithoutBatchInput | IngestedArticleUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: IngestedArticleCreateManyBatchInputEnvelope
    set?: IngestedArticleWhereUniqueInput | IngestedArticleWhereUniqueInput[]
    disconnect?: IngestedArticleWhereUniqueInput | IngestedArticleWhereUniqueInput[]
    delete?: IngestedArticleWhereUniqueInput | IngestedArticleWhereUniqueInput[]
    connect?: IngestedArticleWhereUniqueInput | IngestedArticleWhereUniqueInput[]
    update?: IngestedArticleUpdateWithWhereUniqueWithoutBatchInput | IngestedArticleUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: IngestedArticleUpdateManyWithWhereWithoutBatchInput | IngestedArticleUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: IngestedArticleScalarWhereInput | IngestedArticleScalarWhereInput[]
  }

  export type TopicCardUncheckedUpdateManyWithoutBatchNestedInput = {
    create?: XOR<TopicCardCreateWithoutBatchInput, TopicCardUncheckedCreateWithoutBatchInput> | TopicCardCreateWithoutBatchInput[] | TopicCardUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: TopicCardCreateOrConnectWithoutBatchInput | TopicCardCreateOrConnectWithoutBatchInput[]
    upsert?: TopicCardUpsertWithWhereUniqueWithoutBatchInput | TopicCardUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: TopicCardCreateManyBatchInputEnvelope
    set?: TopicCardWhereUniqueInput | TopicCardWhereUniqueInput[]
    disconnect?: TopicCardWhereUniqueInput | TopicCardWhereUniqueInput[]
    delete?: TopicCardWhereUniqueInput | TopicCardWhereUniqueInput[]
    connect?: TopicCardWhereUniqueInput | TopicCardWhereUniqueInput[]
    update?: TopicCardUpdateWithWhereUniqueWithoutBatchInput | TopicCardUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: TopicCardUpdateManyWithWhereWithoutBatchInput | TopicCardUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: TopicCardScalarWhereInput | TopicCardScalarWhereInput[]
  }

  export type IngestedArticleUncheckedUpdateManyWithoutBatchNestedInput = {
    create?: XOR<IngestedArticleCreateWithoutBatchInput, IngestedArticleUncheckedCreateWithoutBatchInput> | IngestedArticleCreateWithoutBatchInput[] | IngestedArticleUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: IngestedArticleCreateOrConnectWithoutBatchInput | IngestedArticleCreateOrConnectWithoutBatchInput[]
    upsert?: IngestedArticleUpsertWithWhereUniqueWithoutBatchInput | IngestedArticleUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: IngestedArticleCreateManyBatchInputEnvelope
    set?: IngestedArticleWhereUniqueInput | IngestedArticleWhereUniqueInput[]
    disconnect?: IngestedArticleWhereUniqueInput | IngestedArticleWhereUniqueInput[]
    delete?: IngestedArticleWhereUniqueInput | IngestedArticleWhereUniqueInput[]
    connect?: IngestedArticleWhereUniqueInput | IngestedArticleWhereUniqueInput[]
    update?: IngestedArticleUpdateWithWhereUniqueWithoutBatchInput | IngestedArticleUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: IngestedArticleUpdateManyWithWhereWithoutBatchInput | IngestedArticleUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: IngestedArticleScalarWhereInput | IngestedArticleScalarWhereInput[]
  }

  export type BatchCreateNestedOneWithoutCardsInput = {
    create?: XOR<BatchCreateWithoutCardsInput, BatchUncheckedCreateWithoutCardsInput>
    connectOrCreate?: BatchCreateOrConnectWithoutCardsInput
    connect?: BatchWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BatchUpdateOneRequiredWithoutCardsNestedInput = {
    create?: XOR<BatchCreateWithoutCardsInput, BatchUncheckedCreateWithoutCardsInput>
    connectOrCreate?: BatchCreateOrConnectWithoutCardsInput
    upsert?: BatchUpsertWithoutCardsInput
    connect?: BatchWhereUniqueInput
    update?: XOR<XOR<BatchUpdateToOneWithWhereWithoutCardsInput, BatchUpdateWithoutCardsInput>, BatchUncheckedUpdateWithoutCardsInput>
  }

  export type BatchCreateNestedOneWithoutArticlesInput = {
    create?: XOR<BatchCreateWithoutArticlesInput, BatchUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: BatchCreateOrConnectWithoutArticlesInput
    connect?: BatchWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BatchUpdateOneRequiredWithoutArticlesNestedInput = {
    create?: XOR<BatchCreateWithoutArticlesInput, BatchUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: BatchCreateOrConnectWithoutArticlesInput
    upsert?: BatchUpsertWithoutArticlesInput
    connect?: BatchWhereUniqueInput
    update?: XOR<XOR<BatchUpdateToOneWithWhereWithoutArticlesInput, BatchUpdateWithoutArticlesInput>, BatchUncheckedUpdateWithoutArticlesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TopicCardCreateWithoutBatchInput = {
    id?: string
    createdAtUtc?: Date | string
    rank: number
    score: number
    clusterKey: string
    cardJsonText: string
  }

  export type TopicCardUncheckedCreateWithoutBatchInput = {
    id?: string
    createdAtUtc?: Date | string
    rank: number
    score: number
    clusterKey: string
    cardJsonText: string
  }

  export type TopicCardCreateOrConnectWithoutBatchInput = {
    where: TopicCardWhereUniqueInput
    create: XOR<TopicCardCreateWithoutBatchInput, TopicCardUncheckedCreateWithoutBatchInput>
  }

  export type TopicCardCreateManyBatchInputEnvelope = {
    data: TopicCardCreateManyBatchInput | TopicCardCreateManyBatchInput[]
  }

  export type IngestedArticleCreateWithoutBatchInput = {
    id?: string
    createdAtUtc?: Date | string
    url: string
    urlCanonical: string
    title: string
    excerpt?: string | null
    domain?: string | null
    sourceCountry?: string | null
    language?: string | null
    seenDateUtc?: Date | string | null
    rawJsonText: string
  }

  export type IngestedArticleUncheckedCreateWithoutBatchInput = {
    id?: string
    createdAtUtc?: Date | string
    url: string
    urlCanonical: string
    title: string
    excerpt?: string | null
    domain?: string | null
    sourceCountry?: string | null
    language?: string | null
    seenDateUtc?: Date | string | null
    rawJsonText: string
  }

  export type IngestedArticleCreateOrConnectWithoutBatchInput = {
    where: IngestedArticleWhereUniqueInput
    create: XOR<IngestedArticleCreateWithoutBatchInput, IngestedArticleUncheckedCreateWithoutBatchInput>
  }

  export type IngestedArticleCreateManyBatchInputEnvelope = {
    data: IngestedArticleCreateManyBatchInput | IngestedArticleCreateManyBatchInput[]
  }

  export type TopicCardUpsertWithWhereUniqueWithoutBatchInput = {
    where: TopicCardWhereUniqueInput
    update: XOR<TopicCardUpdateWithoutBatchInput, TopicCardUncheckedUpdateWithoutBatchInput>
    create: XOR<TopicCardCreateWithoutBatchInput, TopicCardUncheckedCreateWithoutBatchInput>
  }

  export type TopicCardUpdateWithWhereUniqueWithoutBatchInput = {
    where: TopicCardWhereUniqueInput
    data: XOR<TopicCardUpdateWithoutBatchInput, TopicCardUncheckedUpdateWithoutBatchInput>
  }

  export type TopicCardUpdateManyWithWhereWithoutBatchInput = {
    where: TopicCardScalarWhereInput
    data: XOR<TopicCardUpdateManyMutationInput, TopicCardUncheckedUpdateManyWithoutBatchInput>
  }

  export type TopicCardScalarWhereInput = {
    AND?: TopicCardScalarWhereInput | TopicCardScalarWhereInput[]
    OR?: TopicCardScalarWhereInput[]
    NOT?: TopicCardScalarWhereInput | TopicCardScalarWhereInput[]
    id?: StringFilter<"TopicCard"> | string
    createdAtUtc?: DateTimeFilter<"TopicCard"> | Date | string
    batchId?: StringFilter<"TopicCard"> | string
    rank?: IntFilter<"TopicCard"> | number
    score?: FloatFilter<"TopicCard"> | number
    clusterKey?: StringFilter<"TopicCard"> | string
    cardJsonText?: StringFilter<"TopicCard"> | string
  }

  export type IngestedArticleUpsertWithWhereUniqueWithoutBatchInput = {
    where: IngestedArticleWhereUniqueInput
    update: XOR<IngestedArticleUpdateWithoutBatchInput, IngestedArticleUncheckedUpdateWithoutBatchInput>
    create: XOR<IngestedArticleCreateWithoutBatchInput, IngestedArticleUncheckedCreateWithoutBatchInput>
  }

  export type IngestedArticleUpdateWithWhereUniqueWithoutBatchInput = {
    where: IngestedArticleWhereUniqueInput
    data: XOR<IngestedArticleUpdateWithoutBatchInput, IngestedArticleUncheckedUpdateWithoutBatchInput>
  }

  export type IngestedArticleUpdateManyWithWhereWithoutBatchInput = {
    where: IngestedArticleScalarWhereInput
    data: XOR<IngestedArticleUpdateManyMutationInput, IngestedArticleUncheckedUpdateManyWithoutBatchInput>
  }

  export type IngestedArticleScalarWhereInput = {
    AND?: IngestedArticleScalarWhereInput | IngestedArticleScalarWhereInput[]
    OR?: IngestedArticleScalarWhereInput[]
    NOT?: IngestedArticleScalarWhereInput | IngestedArticleScalarWhereInput[]
    id?: StringFilter<"IngestedArticle"> | string
    createdAtUtc?: DateTimeFilter<"IngestedArticle"> | Date | string
    batchId?: StringFilter<"IngestedArticle"> | string
    url?: StringFilter<"IngestedArticle"> | string
    urlCanonical?: StringFilter<"IngestedArticle"> | string
    title?: StringFilter<"IngestedArticle"> | string
    excerpt?: StringNullableFilter<"IngestedArticle"> | string | null
    domain?: StringNullableFilter<"IngestedArticle"> | string | null
    sourceCountry?: StringNullableFilter<"IngestedArticle"> | string | null
    language?: StringNullableFilter<"IngestedArticle"> | string | null
    seenDateUtc?: DateTimeNullableFilter<"IngestedArticle"> | Date | string | null
    rawJsonText?: StringFilter<"IngestedArticle"> | string
  }

  export type BatchCreateWithoutCardsInput = {
    id: string
    createdAtUtc?: Date | string
    windowStartUtc: Date | string
    windowEndUtc: Date | string
    status: string
    error?: string | null
    gdeltQuery: string
    gdeltUrl: string
    articleCount: number
    europeArticleCount: number
    supplementLinksText?: string | null
    articles?: IngestedArticleCreateNestedManyWithoutBatchInput
  }

  export type BatchUncheckedCreateWithoutCardsInput = {
    id: string
    createdAtUtc?: Date | string
    windowStartUtc: Date | string
    windowEndUtc: Date | string
    status: string
    error?: string | null
    gdeltQuery: string
    gdeltUrl: string
    articleCount: number
    europeArticleCount: number
    supplementLinksText?: string | null
    articles?: IngestedArticleUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutCardsInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutCardsInput, BatchUncheckedCreateWithoutCardsInput>
  }

  export type BatchUpsertWithoutCardsInput = {
    update: XOR<BatchUpdateWithoutCardsInput, BatchUncheckedUpdateWithoutCardsInput>
    create: XOR<BatchCreateWithoutCardsInput, BatchUncheckedCreateWithoutCardsInput>
    where?: BatchWhereInput
  }

  export type BatchUpdateToOneWithWhereWithoutCardsInput = {
    where?: BatchWhereInput
    data: XOR<BatchUpdateWithoutCardsInput, BatchUncheckedUpdateWithoutCardsInput>
  }

  export type BatchUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowStartUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEndUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    gdeltQuery?: StringFieldUpdateOperationsInput | string
    gdeltUrl?: StringFieldUpdateOperationsInput | string
    articleCount?: IntFieldUpdateOperationsInput | number
    europeArticleCount?: IntFieldUpdateOperationsInput | number
    supplementLinksText?: NullableStringFieldUpdateOperationsInput | string | null
    articles?: IngestedArticleUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowStartUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEndUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    gdeltQuery?: StringFieldUpdateOperationsInput | string
    gdeltUrl?: StringFieldUpdateOperationsInput | string
    articleCount?: IntFieldUpdateOperationsInput | number
    europeArticleCount?: IntFieldUpdateOperationsInput | number
    supplementLinksText?: NullableStringFieldUpdateOperationsInput | string | null
    articles?: IngestedArticleUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type BatchCreateWithoutArticlesInput = {
    id: string
    createdAtUtc?: Date | string
    windowStartUtc: Date | string
    windowEndUtc: Date | string
    status: string
    error?: string | null
    gdeltQuery: string
    gdeltUrl: string
    articleCount: number
    europeArticleCount: number
    supplementLinksText?: string | null
    cards?: TopicCardCreateNestedManyWithoutBatchInput
  }

  export type BatchUncheckedCreateWithoutArticlesInput = {
    id: string
    createdAtUtc?: Date | string
    windowStartUtc: Date | string
    windowEndUtc: Date | string
    status: string
    error?: string | null
    gdeltQuery: string
    gdeltUrl: string
    articleCount: number
    europeArticleCount: number
    supplementLinksText?: string | null
    cards?: TopicCardUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutArticlesInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutArticlesInput, BatchUncheckedCreateWithoutArticlesInput>
  }

  export type BatchUpsertWithoutArticlesInput = {
    update: XOR<BatchUpdateWithoutArticlesInput, BatchUncheckedUpdateWithoutArticlesInput>
    create: XOR<BatchCreateWithoutArticlesInput, BatchUncheckedCreateWithoutArticlesInput>
    where?: BatchWhereInput
  }

  export type BatchUpdateToOneWithWhereWithoutArticlesInput = {
    where?: BatchWhereInput
    data: XOR<BatchUpdateWithoutArticlesInput, BatchUncheckedUpdateWithoutArticlesInput>
  }

  export type BatchUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowStartUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEndUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    gdeltQuery?: StringFieldUpdateOperationsInput | string
    gdeltUrl?: StringFieldUpdateOperationsInput | string
    articleCount?: IntFieldUpdateOperationsInput | number
    europeArticleCount?: IntFieldUpdateOperationsInput | number
    supplementLinksText?: NullableStringFieldUpdateOperationsInput | string | null
    cards?: TopicCardUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowStartUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEndUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    gdeltQuery?: StringFieldUpdateOperationsInput | string
    gdeltUrl?: StringFieldUpdateOperationsInput | string
    articleCount?: IntFieldUpdateOperationsInput | number
    europeArticleCount?: IntFieldUpdateOperationsInput | number
    supplementLinksText?: NullableStringFieldUpdateOperationsInput | string | null
    cards?: TopicCardUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type TopicCardCreateManyBatchInput = {
    id?: string
    createdAtUtc?: Date | string
    rank: number
    score: number
    clusterKey: string
    cardJsonText: string
  }

  export type IngestedArticleCreateManyBatchInput = {
    id?: string
    createdAtUtc?: Date | string
    url: string
    urlCanonical: string
    title: string
    excerpt?: string | null
    domain?: string | null
    sourceCountry?: string | null
    language?: string | null
    seenDateUtc?: Date | string | null
    rawJsonText: string
  }

  export type TopicCardUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    clusterKey?: StringFieldUpdateOperationsInput | string
    cardJsonText?: StringFieldUpdateOperationsInput | string
  }

  export type TopicCardUncheckedUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    clusterKey?: StringFieldUpdateOperationsInput | string
    cardJsonText?: StringFieldUpdateOperationsInput | string
  }

  export type TopicCardUncheckedUpdateManyWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    rank?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    clusterKey?: StringFieldUpdateOperationsInput | string
    cardJsonText?: StringFieldUpdateOperationsInput | string
  }

  export type IngestedArticleUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    urlCanonical?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    sourceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    seenDateUtc?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawJsonText?: StringFieldUpdateOperationsInput | string
  }

  export type IngestedArticleUncheckedUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    urlCanonical?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    sourceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    seenDateUtc?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawJsonText?: StringFieldUpdateOperationsInput | string
  }

  export type IngestedArticleUncheckedUpdateManyWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAtUtc?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    urlCanonical?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    sourceCountry?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    seenDateUtc?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawJsonText?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use BatchCountOutputTypeDefaultArgs instead
     */
    export type BatchCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BatchCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BatchDefaultArgs instead
     */
    export type BatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BatchDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TopicCardDefaultArgs instead
     */
    export type TopicCardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TopicCardDefaultArgs<ExtArgs>
    /**
     * @deprecated Use IngestedArticleDefaultArgs instead
     */
    export type IngestedArticleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = IngestedArticleDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
