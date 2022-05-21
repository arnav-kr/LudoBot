/// <reference types="node" />
import { InspectOptionsStylized } from 'node:util';

declare type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
declare const TypedArrays: {
    readonly Int8Array: (x: unknown) => x is Int8Array;
    readonly Uint8Array: (x: unknown) => x is Uint8Array;
    readonly Uint8ClampedArray: (x: unknown) => x is Uint8ClampedArray;
    readonly Int16Array: (x: unknown) => x is Int16Array;
    readonly Uint16Array: (x: unknown) => x is Uint16Array;
    readonly Int32Array: (x: unknown) => x is Int32Array;
    readonly Uint32Array: (x: unknown) => x is Uint32Array;
    readonly Float32Array: (x: unknown) => x is Float32Array;
    readonly Float64Array: (x: unknown) => x is Float64Array;
    readonly BigInt64Array: (x: unknown) => x is BigInt64Array;
    readonly BigUint64Array: (x: unknown) => x is BigUint64Array;
    readonly TypedArray: (x: unknown) => x is TypedArray;
};
declare type TypedArrayName = keyof typeof TypedArrays;

declare type ArrayConstraintName = `s.array(T).length${'Lt' | 'Le' | 'Gt' | 'Ge' | 'Eq' | 'Ne' | 'Range' | 'RangeInclusive' | 'RangeExclusive'}`;
declare function arrayLengthLt<T>(value: number): IConstraint<T[]>;
declare function arrayLengthLe<T>(value: number): IConstraint<T[]>;
declare function arrayLengthGt<T>(value: number): IConstraint<T[]>;
declare function arrayLengthGe<T>(value: number): IConstraint<T[]>;
declare function arrayLengthEq<T>(value: number): IConstraint<T[]>;
declare function arrayLengthNe<T>(value: number): IConstraint<T[]>;
declare function arrayLengthRange<T>(start: number, endBefore: number): IConstraint<T[]>;
declare function arrayLengthRangeInclusive<T>(start: number, end: number): IConstraint<T[]>;
declare function arrayLengthRangeExclusive<T>(startAfter: number, endBefore: number): IConstraint<T[]>;

declare const customInspectSymbol: unique symbol;
declare const customInspectSymbolStackLess: unique symbol;
declare abstract class BaseError extends Error {
    protected [customInspectSymbol](depth: number, options: InspectOptionsStylized): string;
    protected abstract [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare class ExpectedConstraintError<T = unknown> extends BaseConstraintError<T> {
    readonly expected: string;
    constructor(constraint: ConstraintErrorNames, message: string, given: T, expected: string);
    toJSON(): {
        name: string;
        constraint: ConstraintErrorNames;
        given: T;
        expected: string;
    };
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare class Result<T, E extends Error = Error> {
    readonly success: boolean;
    readonly value?: T;
    readonly error?: E;
    private constructor();
    isOk(): this is {
        success: true;
        value: T;
    };
    isErr(): this is {
        success: false;
        error: E;
    };
    unwrap(): T;
    static ok<T, E extends Error = Error>(value: T): Result<T, E>;
    static err<T, E extends Error = Error>(error: E): Result<T, E>;
}

declare type TypedArrayConstraintName = `s.typedArray(T).${'byteLength' | 'length'}${'Lt' | 'Le' | 'Gt' | 'Ge' | 'Eq' | 'Ne' | 'Range' | 'RangeInclusive' | 'RangeExclusive'}`;
declare function typedArrayByteLengthLt<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayByteLengthLe<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayByteLengthGt<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayByteLengthGe<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayByteLengthEq<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayByteLengthNe<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayByteLengthRange<T extends TypedArray>(start: number, endBefore: number): IConstraint<T>;
declare function typedArrayByteLengthRangeInclusive<T extends TypedArray>(start: number, end: number): {
    run(input: T): Result<T, Error> | Result<unknown, ExpectedConstraintError<T>>;
};
declare function typedArrayByteLengthRangeExclusive<T extends TypedArray>(startAfter: number, endBefore: number): IConstraint<T>;
declare function typedArrayLengthLt<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayLengthLe<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayLengthGt<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayLengthGe<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayLengthEq<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayLengthNe<T extends TypedArray>(value: number): IConstraint<T>;
declare function typedArrayLengthRange<T extends TypedArray>(start: number, endBefore: number): IConstraint<T>;
declare function typedArrayLengthRangeInclusive<T extends TypedArray>(start: number, end: number): IConstraint<T>;
declare function typedArrayLengthRangeExclusive<T extends TypedArray>(startAfter: number, endBefore: number): IConstraint<T>;

declare type BigIntConstraintName = `s.bigint.${'lt' | 'le' | 'gt' | 'ge' | 'eq' | 'ne' | 'divisibleBy'}`;
declare function bigintLt(value: bigint): IConstraint<bigint>;
declare function bigintLe(value: bigint): IConstraint<bigint>;
declare function bigintGt(value: bigint): IConstraint<bigint>;
declare function bigintGe(value: bigint): IConstraint<bigint>;
declare function bigintEq(value: bigint): IConstraint<bigint>;
declare function bigintNe(value: bigint): IConstraint<bigint>;
declare function bigintDivisibleBy(divider: bigint): IConstraint<bigint>;

declare type BooleanConstraintName = `s.boolean.${boolean}`;
declare const booleanTrue: IConstraint<boolean, true>;
declare const booleanFalse: IConstraint<boolean, false>;

declare type DateConstraintName = `s.date.${'lt' | 'le' | 'gt' | 'ge' | 'eq' | 'ne' | 'valid' | 'invalid'}`;
declare function dateLt(value: Date): IConstraint<Date>;
declare function dateLe(value: Date): IConstraint<Date>;
declare function dateGt(value: Date): IConstraint<Date>;
declare function dateGe(value: Date): IConstraint<Date>;
declare function dateEq(value: Date): IConstraint<Date>;
declare function dateNe(value: Date): IConstraint<Date>;
declare const dateInvalid: IConstraint<Date>;
declare const dateValid: IConstraint<Date>;

declare type NumberConstraintName = `s.number.${'lt' | 'le' | 'gt' | 'ge' | 'eq' | 'eq(NaN)' | 'ne' | 'ne(NaN)' | 'int' | 'safeInt' | 'finite' | 'divisibleBy'}`;
declare function numberLt(value: number): IConstraint<number>;
declare function numberLe(value: number): IConstraint<number>;
declare function numberGt(value: number): IConstraint<number>;
declare function numberGe(value: number): IConstraint<number>;
declare function numberEq(value: number): IConstraint<number>;
declare function numberNe(value: number): IConstraint<number>;
declare const numberInt: IConstraint<number>;
declare const numberSafeInt: IConstraint<number>;
declare const numberFinite: IConstraint<number>;
declare const numberNaN: IConstraint<number>;
declare const numberNeNaN: IConstraint<number>;
declare function numberDivisibleBy(divider: number): IConstraint<number>;

declare type StringConstraintName = `s.string.${`length${'Lt' | 'Le' | 'Gt' | 'Ge' | 'Eq' | 'Ne'}` | 'regex' | 'url' | 'uuid' | 'email' | `ip${'v4' | 'v6' | ''}`}`;
declare type StringProtocol = `${string}:`;
declare type StringDomain = `${string}.${string}`;
interface UrlOptions {
    allowedProtocols?: StringProtocol[];
    allowedDomains?: StringDomain[];
}
declare type UUIDVersion = 1 | 3 | 4 | 5;
interface StringUuidOptions {
    version?: UUIDVersion | `${UUIDVersion}-${UUIDVersion}` | null;
    nullable?: boolean;
}
declare function stringLengthLt(length: number): IConstraint<string>;
declare function stringLengthLe(length: number): IConstraint<string>;
declare function stringLengthGt(length: number): IConstraint<string>;
declare function stringLengthGe(length: number): IConstraint<string>;
declare function stringLengthEq(length: number): IConstraint<string>;
declare function stringLengthNe(length: number): IConstraint<string>;
declare function stringEmail(): IConstraint<string>;
declare function stringUrl(options?: UrlOptions): IConstraint<string>;
declare function stringIp(version?: 4 | 6): IConstraint<string>;
declare function stringRegex(regex: RegExp): IConstraint<string, string>;
declare function stringUuid({ version, nullable }?: StringUuidOptions): IConstraint<string, string>;

declare type ConstraintErrorNames = TypedArrayConstraintName | ArrayConstraintName | BigIntConstraintName | BooleanConstraintName | DateConstraintName | NumberConstraintName | StringConstraintName;
declare abstract class BaseConstraintError<T = unknown> extends BaseError {
    readonly constraint: ConstraintErrorNames;
    readonly given: T;
    constructor(constraint: ConstraintErrorNames, message: string, given: T);
}

interface IConstraint<Input, Return extends Input = Input> {
    run(input: Input): Result<Return, BaseConstraintError<Input>>;
}

declare class CombinedError extends BaseError {
    readonly errors: readonly BaseError[];
    constructor(errors: readonly BaseError[]);
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare class CombinedPropertyError extends BaseError {
    readonly errors: [PropertyKey, BaseError][];
    constructor(errors: [PropertyKey, BaseError][]);
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
    private static formatProperty;
}

declare class UnknownEnumValueError extends BaseError {
    readonly value: string | number;
    readonly enumKeys: string[];
    readonly enumMappings: Map<string | number, string | number>;
    constructor(value: string | number, keys: string[], enumMappings: Map<string | number, string | number>);
    toJSON(): {
        name: string;
        value: string | number;
        enumKeys: string[];
        enumMappings: [string | number, string | number][];
    };
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare class ValidationError extends BaseError {
    readonly validator: string;
    readonly given: unknown;
    constructor(validator: string, message: string, given: unknown);
    toJSON(): {
        name: string;
        validator: string;
        given: unknown;
    };
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare abstract class BaseValidator<T> {
    protected constraints: readonly IConstraint<T>[];
    constructor(constraints?: readonly IConstraint<T>[]);
    get optional(): UnionValidator<T | undefined>;
    get nullable(): UnionValidator<T | null>;
    get nullish(): UnionValidator<T | null | undefined>;
    get array(): ArrayValidator<T>;
    get set(): SetValidator<T>;
    or<O>(...predicates: readonly BaseValidator<O>[]): UnionValidator<T | O>;
    transform(cb: (value: T) => T): this;
    transform<O>(cb: (value: T) => O): BaseValidator<O>;
    default(value: Exclude<T, undefined> | (() => Exclude<T, undefined>)): DefaultValidator<Exclude<T, undefined>>;
    run(value: unknown): Result<T, BaseError>;
    parse(value: unknown): T;
    protected clone(): this;
    protected abstract handle(value: unknown): Result<T, ValidatorError>;
    protected addConstraint(constraint: IConstraint<T>): this;
}
declare type ValidatorError = ValidationError | CombinedError | CombinedPropertyError | UnknownEnumValueError;

declare class ArrayValidator<T> extends BaseValidator<T[]> {
    private readonly validator;
    constructor(validator: BaseValidator<T>, constraints?: readonly IConstraint<T[]>[]);
    lengthLt<N extends number>(length: N): BaseValidator<ExpandSmallerTuples<UnshiftTuple<[...Tuple<T, N>]>>>;
    lengthLe<N extends number>(length: N): BaseValidator<ExpandSmallerTuples<[...Tuple<T, N>]>>;
    lengthGt<N extends number>(length: N): BaseValidator<[...Tuple<T, N>, T, ...T[]]>;
    lengthGe<N extends number>(length: N): BaseValidator<[...Tuple<T, N>, ...T[]]>;
    lengthEq<N extends number>(length: N): BaseValidator<[...Tuple<T, N>]>;
    lengthNe(length: number): BaseValidator<[...T[]]>;
    lengthRange<S extends number, E extends number>(start: S, endBefore: E): BaseValidator<Exclude<ExpandSmallerTuples<UnshiftTuple<[...Tuple<T, E>]>>, ExpandSmallerTuples<UnshiftTuple<[...Tuple<T, S>]>>>>;
    lengthRangeInclusive<S extends number, E extends number>(startAt: S, endAt: E): BaseValidator<Exclude<ExpandSmallerTuples<[...Tuple<T, E>]>, ExpandSmallerTuples<UnshiftTuple<[...Tuple<T, S>]>>>>;
    lengthRangeExclusive<S extends number, E extends number>(startAfter: S, endBefore: E): BaseValidator<Exclude<ExpandSmallerTuples<UnshiftTuple<[...Tuple<T, E>]>>, ExpandSmallerTuples<[...Tuple<T, S>]>>>;
    protected clone(): this;
    protected handle(values: unknown): Result<T[], ValidationError | CombinedPropertyError>;
}
declare type UnshiftTuple<T extends [...any[]]> = T extends [T[0], ...infer Tail] ? Tail : never;
declare type ExpandSmallerTuples<T extends [...any[]]> = T extends [T[0], ...infer Tail] ? T | ExpandSmallerTuples<Tail> : [];
declare type Shift<A extends Array<any>> = ((...args: A) => void) extends (...args: [A[0], ...infer R]) => void ? R : never;
declare type GrowExpRev<A extends Array<any>, N extends number, P extends Array<Array<any>>> = A['length'] extends N ? A : GrowExpRev<[...A, ...P[0]][N] extends undefined ? [...A, ...P[0]] : A, N, Shift<P>>;
declare type GrowExp<A extends Array<any>, N extends number, P extends Array<Array<any>>> = [...A, ...A][N] extends undefined ? GrowExp<[...A, ...A], N, [A, ...P]> : GrowExpRev<A, N, P>;
declare type Tuple<T, N extends number> = number extends N ? Array<T> : N extends 0 ? [] : N extends 1 ? [T] : GrowExp<[T], N, [[]]>;

declare class BigIntValidator<T extends bigint> extends BaseValidator<T> {
    lt(number: bigint): this;
    le(number: bigint): this;
    gt(number: bigint): this;
    ge(number: bigint): this;
    eq<N extends bigint>(number: N): BigIntValidator<N>;
    ne(number: bigint): this;
    get positive(): this;
    get negative(): this;
    divisibleBy(number: bigint): this;
    get abs(): this;
    intN(bits: number): this;
    uintN(bits: number): this;
    protected handle(value: unknown): Result<T, ValidationError>;
}

declare class BooleanValidator<T extends boolean = boolean> extends BaseValidator<T> {
    get true(): BooleanValidator<true>;
    get false(): BooleanValidator<false>;
    eq<R extends true | false>(value: R): BooleanValidator<R>;
    ne<R extends true | false>(value: R): BooleanValidator<R>;
    protected handle(value: unknown): Result<T, ValidationError>;
}

declare class DateValidator extends BaseValidator<Date> {
    lt(date: Date | number | string): this;
    le(date: Date | number | string): this;
    gt(date: Date | number | string): this;
    ge(date: Date | number | string): this;
    eq(date: Date | number | string): this;
    ne(date: Date | number | string): this;
    get valid(): this;
    get invalid(): this;
    protected handle(value: unknown): Result<Date, ValidationError>;
}

declare class ExpectedValidationError<T> extends ValidationError {
    readonly expected: T;
    constructor(validator: string, message: string, given: unknown, expected: T);
    toJSON(): {
        name: string;
        validator: string;
        given: unknown;
        expected: T;
    };
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare type Constructor<T> = (new (...args: readonly any[]) => T) | (abstract new (...args: readonly any[]) => T);
declare type Type<V> = V extends BaseValidator<infer T> ? T : never;
declare type NonNullObject = {} & object;
declare type MappedObjectValidator<T> = {
    [key in keyof T]: BaseValidator<T[key]>;
};

declare class InstanceValidator<T> extends BaseValidator<T> {
    readonly expected: Constructor<T>;
    constructor(expected: Constructor<T>, constraints?: readonly IConstraint<T>[]);
    protected handle(value: unknown): Result<T, ExpectedValidationError<Constructor<T>>>;
    protected clone(): this;
}

declare class LiteralValidator<T> extends BaseValidator<T> {
    readonly expected: T;
    constructor(literal: T, constraints?: readonly IConstraint<T>[]);
    protected handle(value: unknown): Result<T, ExpectedValidationError<T>>;
    protected clone(): this;
}

declare class NeverValidator extends BaseValidator<never> {
    protected handle(value: unknown): Result<never, ValidationError>;
}

declare class NullishValidator extends BaseValidator<undefined | null> {
    protected handle(value: unknown): Result<undefined | null, ValidationError>;
}

declare class NumberValidator<T extends number> extends BaseValidator<T> {
    lt(number: number): this;
    le(number: number): this;
    gt(number: number): this;
    ge(number: number): this;
    eq<N extends number>(number: N): NumberValidator<N>;
    ne(number: number): this;
    get int(): this;
    get safeInt(): this;
    get finite(): this;
    get positive(): this;
    get negative(): this;
    divisibleBy(divider: number): this;
    get abs(): this;
    get sign(): this;
    get trunc(): this;
    get floor(): this;
    get fround(): this;
    get round(): this;
    get ceil(): this;
    protected handle(value: unknown): Result<T, ValidationError>;
}

declare class ObjectValidator<T extends NonNullObject> extends BaseValidator<T> {
    readonly shape: MappedObjectValidator<T>;
    readonly strategy: ObjectValidatorStrategy;
    private readonly keys;
    private readonly handleStrategy;
    constructor(shape: MappedObjectValidator<T>, strategy?: ObjectValidatorStrategy, constraints?: readonly IConstraint<T>[]);
    get strict(): ObjectValidator<{
        [Key in keyof T]-?: T[Key];
    }>;
    get ignore(): this;
    get passthrough(): this;
    get partial(): ObjectValidator<{
        [Key in keyof T]?: T[Key];
    }>;
    extend<ET extends NonNullObject>(schema: ObjectValidator<ET> | MappedObjectValidator<ET>): ObjectValidator<T & ET>;
    pick<K extends keyof T>(keys: readonly K[]): ObjectValidator<{
        [Key in keyof Pick<T, K>]: T[Key];
    }>;
    omit<K extends keyof T>(keys: readonly K[]): ObjectValidator<{
        [Key in keyof Omit<T, K>]: T[Key];
    }>;
    protected handle(value: unknown): Result<T, ValidationError | CombinedPropertyError>;
    protected clone(): this;
    private handleIgnoreStrategy;
    private handleStrictStrategy;
    private handlePassthroughStrategy;
}
declare const enum ObjectValidatorStrategy {
    Ignore = 0,
    Strict = 1,
    Passthrough = 2
}

declare class PassthroughValidator<T extends any | unknown> extends BaseValidator<T> {
    protected handle(value: unknown): Result<T, ValidationError>;
}

declare class RecordValidator<T> extends BaseValidator<Record<string, T>> {
    private readonly validator;
    constructor(validator: BaseValidator<T>, constraints?: readonly IConstraint<Record<string, T>>[]);
    protected clone(): this;
    protected handle(value: unknown): Result<Record<string, T>, ValidationError | CombinedPropertyError>;
}

declare class SetValidator<T> extends BaseValidator<Set<T>> {
    private readonly validator;
    constructor(validator: BaseValidator<T>, constraints?: readonly IConstraint<Set<T>>[]);
    protected clone(): this;
    protected handle(values: unknown): Result<Set<T>, ValidationError | CombinedError>;
}

declare class StringValidator<T extends string> extends BaseValidator<T> {
    lengthLt(length: number): this;
    lengthLe(length: number): this;
    lengthGt(length: number): this;
    lengthGe(length: number): this;
    lengthEq(length: number): this;
    lengthNe(length: number): this;
    get email(): this;
    url(options?: UrlOptions): this;
    uuid(options?: StringUuidOptions): this;
    regex(regex: RegExp): this;
    get ipv4(): this;
    get ipv6(): this;
    ip(version?: 4 | 6): this;
    protected handle(value: unknown): Result<T, ValidationError>;
}

declare class TupleValidator<T extends any[]> extends BaseValidator<[...T]> {
    private readonly validators;
    constructor(validators: BaseValidator<[...T]>[], constraints?: readonly IConstraint<[...T]>[]);
    protected clone(): this;
    protected handle(values: unknown): Result<[...T], ValidationError | CombinedPropertyError>;
}

declare class UnionValidator<T> extends BaseValidator<T> {
    private validators;
    constructor(validators: readonly BaseValidator<T>[], constraints?: readonly IConstraint<T>[]);
    get optional(): UnionValidator<T | undefined>;
    get nullable(): UnionValidator<T | null>;
    get nullish(): UnionValidator<T | null | undefined>;
    or<O>(...predicates: readonly BaseValidator<O>[]): UnionValidator<T | O>;
    protected clone(): this;
    protected handle(value: unknown): Result<T, ValidationError | CombinedError>;
}

declare class MapValidator<K, V> extends BaseValidator<Map<K, V>> {
    private readonly keyValidator;
    private readonly valueValidator;
    constructor(keyValidator: BaseValidator<K>, valueValidator: BaseValidator<V>, constraints?: readonly IConstraint<Map<K, V>>[]);
    protected clone(): this;
    protected handle(value: unknown): Result<Map<K, V>, ValidationError | CombinedPropertyError>;
}

declare class DefaultValidator<T> extends BaseValidator<T> {
    private readonly validator;
    private defaultValue;
    constructor(validator: BaseValidator<T>, value: T | (() => T), constraints?: readonly IConstraint<T>[]);
    default(value: Exclude<T, undefined> | (() => Exclude<T, undefined>)): DefaultValidator<Exclude<T, undefined>>;
    protected handle(value: unknown): Result<T, ValidatorError>;
    protected clone(): this;
}

declare class NativeEnumValidator<T extends NativeEnumLike> extends BaseValidator<T[keyof T]> {
    readonly enumShape: T;
    readonly hasNumericElements: boolean;
    private readonly enumKeys;
    private readonly enumMapping;
    constructor(enumShape: T);
    protected handle(value: unknown): Result<T[keyof T], ValidationError | UnknownEnumValueError>;
    protected clone(): this;
}
interface NativeEnumLike {
    [key: string]: string | number;
    [key: number]: string;
}

declare class TypedArrayValidator<T extends TypedArray> extends BaseValidator<T> {
    private readonly type;
    constructor(type: TypedArrayName, constraints?: readonly IConstraint<T>[]);
    byteLengthLt(length: number): this;
    byteLengthLe(length: number): this;
    byteLengthGt(length: number): this;
    byteLengthGe(length: number): this;
    byteLengthEq(length: number): this;
    byteLengthNe(length: number): this;
    byteLengthRange(start: number, endBefore: number): this;
    byteLengthRangeInclusive(startAt: number, endAt: number): this;
    byteLengthRangeExclusive(startAfter: number, endBefore: number): this;
    lengthLt(length: number): this;
    lengthLe(length: number): this;
    lengthGt(length: number): this;
    lengthGe(length: number): this;
    lengthEq(length: number): this;
    lengthNe(length: number): this;
    lengthRange(start: number, endBefore: number): this;
    lengthRangeInclusive(startAt: number, endAt: number): this;
    lengthRangeExclusive(startAfter: number, endBefore: number): this;
    protected clone(): this;
    protected handle(value: unknown): Result<T, ValidationError>;
}

declare class Shapes {
    get string(): StringValidator<string>;
    get number(): NumberValidator<number>;
    get bigint(): BigIntValidator<bigint>;
    get boolean(): BooleanValidator<boolean>;
    get date(): DateValidator;
    object<T>(shape: MappedObjectValidator<T>): ObjectValidator<T>;
    get undefined(): BaseValidator<undefined>;
    get null(): BaseValidator<null>;
    get nullish(): NullishValidator;
    get any(): PassthroughValidator<any>;
    get unknown(): PassthroughValidator<unknown>;
    get never(): NeverValidator;
    enum<T>(...values: readonly T[]): UnionValidator<T>;
    nativeEnum<T extends NativeEnumLike>(enumShape: T): NativeEnumValidator<T>;
    literal<T>(value: T): BaseValidator<T>;
    instance<T>(expected: Constructor<T>): InstanceValidator<T>;
    union<T extends [...BaseValidator<any>[]]>(...validators: [...T]): UnionValidator<Unwrap<T[number]>>;
    array<T>(validator: BaseValidator<T>): ArrayValidator<T>;
    typedArray<T extends TypedArray>(type?: TypedArrayName): TypedArrayValidator<T>;
    get int8Array(): TypedArrayValidator<Int8Array>;
    get uint8Array(): TypedArrayValidator<Uint8Array>;
    get uint8ClampedArray(): TypedArrayValidator<Uint8ClampedArray>;
    get int16Array(): TypedArrayValidator<Int16Array>;
    get uint16Array(): TypedArrayValidator<Uint16Array>;
    get int32Array(): TypedArrayValidator<Int32Array>;
    get uint32Array(): TypedArrayValidator<Uint32Array>;
    get float32Array(): TypedArrayValidator<Float32Array>;
    get float64Array(): TypedArrayValidator<Float64Array>;
    get bigInt64Array(): TypedArrayValidator<BigInt64Array>;
    get bigUint64Array(): TypedArrayValidator<BigUint64Array>;
    tuple<T extends [...BaseValidator<any>[]]>(validators: [...T]): TupleValidator<UnwrapTuple<T>>;
    set<T>(validator: BaseValidator<T>): SetValidator<T>;
    record<T>(validator: BaseValidator<T>): RecordValidator<T>;
    map<T, U>(keyValidator: BaseValidator<T>, valueValidator: BaseValidator<U>): MapValidator<T, U>;
}
declare type UnwrapTuple<T extends [...any[]]> = T extends [infer Head, ...infer Tail] ? [Unwrap<Head>, ...UnwrapTuple<Tail>] : [];
declare type Unwrap<T> = T extends BaseValidator<infer V> ? V : never;

declare class MissingPropertyError extends BaseError {
    readonly property: PropertyKey;
    constructor(property: PropertyKey);
    toJSON(): {
        name: string;
        property: PropertyKey;
    };
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare class MultiplePossibilitiesConstraintError<T = unknown> extends BaseConstraintError<T> {
    readonly expected: readonly string[];
    constructor(constraint: ConstraintErrorNames, message: string, given: T, expected: readonly string[]);
    toJSON(): {
        name: string;
        constraint: ConstraintErrorNames;
        given: T;
        expected: readonly string[];
    };
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare class UnknownPropertyError extends BaseError {
    readonly property: PropertyKey;
    readonly value: unknown;
    constructor(property: PropertyKey, value: unknown);
    toJSON(): {
        name: string;
        property: PropertyKey;
        value: unknown;
    };
    protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string;
}

declare const s: Shapes;

export { ArrayConstraintName, ArrayValidator, BaseConstraintError, BaseError, BaseValidator, BigIntConstraintName, BigIntValidator, BooleanConstraintName, BooleanValidator, CombinedError, CombinedPropertyError, ConstraintErrorNames, Constructor, DateConstraintName, DateValidator, DefaultValidator, ExpandSmallerTuples, ExpectedConstraintError, ExpectedValidationError, GrowExp, GrowExpRev, IConstraint, InstanceValidator, LiteralValidator, MapValidator, MappedObjectValidator, MissingPropertyError, MultiplePossibilitiesConstraintError, NativeEnumLike, NativeEnumValidator, NeverValidator, NonNullObject, NullishValidator, NumberConstraintName, NumberValidator, ObjectValidator, ObjectValidatorStrategy, PassthroughValidator, RecordValidator, Result, SetValidator, Shapes, Shift, StringConstraintName, StringDomain, StringProtocol, StringUuidOptions, StringValidator, Tuple, TupleValidator, Type, TypedArrayConstraintName, TypedArrayValidator, UUIDVersion, UnionValidator, UnknownEnumValueError, UnknownPropertyError, UnshiftTuple, Unwrap, UnwrapTuple, UrlOptions, ValidationError, ValidatorError, arrayLengthEq, arrayLengthGe, arrayLengthGt, arrayLengthLe, arrayLengthLt, arrayLengthNe, arrayLengthRange, arrayLengthRangeExclusive, arrayLengthRangeInclusive, bigintDivisibleBy, bigintEq, bigintGe, bigintGt, bigintLe, bigintLt, bigintNe, booleanFalse, booleanTrue, customInspectSymbol, customInspectSymbolStackLess, dateEq, dateGe, dateGt, dateInvalid, dateLe, dateLt, dateNe, dateValid, numberDivisibleBy, numberEq, numberFinite, numberGe, numberGt, numberInt, numberLe, numberLt, numberNaN, numberNe, numberNeNaN, numberSafeInt, s, stringEmail, stringIp, stringLengthEq, stringLengthGe, stringLengthGt, stringLengthLe, stringLengthLt, stringLengthNe, stringRegex, stringUrl, stringUuid, typedArrayByteLengthEq, typedArrayByteLengthGe, typedArrayByteLengthGt, typedArrayByteLengthLe, typedArrayByteLengthLt, typedArrayByteLengthNe, typedArrayByteLengthRange, typedArrayByteLengthRangeExclusive, typedArrayByteLengthRangeInclusive, typedArrayLengthEq, typedArrayLengthGe, typedArrayLengthGt, typedArrayLengthLe, typedArrayLengthLt, typedArrayLengthNe, typedArrayLengthRange, typedArrayLengthRangeExclusive, typedArrayLengthRangeInclusive };
