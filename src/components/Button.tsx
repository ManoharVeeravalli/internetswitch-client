

function Button({ name, loading }: { name: string, loading: boolean}) {
    return <>
        <button type="submit" disabled={loading}>
            {loading && <div className='button-loader'></div>}{name}
        </button>
    </>
}

export default Button;