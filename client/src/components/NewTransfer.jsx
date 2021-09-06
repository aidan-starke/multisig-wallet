import React, { useState } from "react"

function NewTransfer ({ createTransfer }) {
    const [transfer, setTransfer] = useState()

    function submit (e) {
        e.preventDefault()
        createTransfer(transfer)
    }

    function updateTransfer (value, field) {
        console.log(value, field)
        setTransfer({ ...transfer, [field]: value })
    }

    return (
        <div>
            <h2>Create transfer</h2>
            <form onSubmit={(e) => submit(e)}>
                <label htmlFor='amount'>Amount</label>
                <input
                    id='amount'
                    type='text'
                    onChange={e => updateTransfer(e.target.value, e.target.id)} />
                <label htmlFor='to'>To</label>
                <input
                    id='to'
                    type='text'
                    onChange={e => updateTransfer(e.target.value, e.target.id)} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default NewTransfer