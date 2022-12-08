export const carregarPagina = async ( file: string ): Promise<string> => {
    const response = await fetch( file );

    return response.text();
};

