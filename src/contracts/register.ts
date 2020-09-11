export interface IRegister
{
    setId(id: string): void;

    resetAccessStatus(): void;

    access(url: string): Promise<IRegister>;

    select(url: string): Promise<IRegister>;

    save(url: string): Promise<IRegister>;

    check(url: string): Promise<IRegister>;

    saved(url: string): Promise<IRegister>;

    saved2(url: string): Promise<boolean>;
}
