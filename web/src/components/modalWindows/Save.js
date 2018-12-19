import React, { useGlobal } from 'reactn'
import Button from '../shared/Button'
import BasePopUp from './BasePopUp'
import { useExit, useMessage } from '../../App'
import { useDoSave } from '../configurator/Configurator'


export default function Save() {
  const onExit = useExit()
  const message = useMessage()
  const doSave = useDoSave()

  return (
    <BasePopUp onExit={ onExit } errMsg={ message }>
      <p className="form-text">
        Please give your panel a name (so it can be recalled later using this name).
      </p>

      <form
          onSubmit={ (event) => {
            event.preventDefault()

            const elements = event.target.elements // Allows looking up fields using their 'name' attributes
            // Get entered values from fields
            const name = elements.name.value
            // Pass this information along to the parent component
            doSave({ name })
          } }
      >
        <label>
          { 'Panel name: ' }
          <input
              type='text'
              name='name'
              defaultValue={ "" }
          />
        </label>

        <br/>
        <Button>Save</Button>
      </form>
    </BasePopUp>
  )
}
