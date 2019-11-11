import JSONEditor from 'jsoneditor'
import { ReactNode, Ref } from 'react'
import { Ajv } from 'ajv'
import React from 'react'
import 'jsoneditor/dist/jsoneditor.min.css'
import { createStyles, withStyles } from '@material-ui/core'
import { WithStyles } from '@material-ui/styles'
import ReactDOM from 'react-dom'

const styles = () =>
  createStyles({
    root: {
      '& .ace_variable_desc': {
        position: 'absolute'
        // left: 300,
      }
      // '.ace_variable_desc': {
      //   left: 300,
      // }
    }
  })

interface JsonEditorTreeNode {
  field: string
  value: string
  path: string[]
}

type JsonEditorMode = 'tree' | 'view' | 'form' | 'code' | 'text'

class JsonEditorOptions {
  public ace?: AceAjax.Ace
  public ajv?: Ajv
  public onChange?: () => void
  public onEditable?: (
    node: JsonEditorTreeNode | {}
  ) =>
    | boolean
    | {
        field: boolean
        value: boolean
      }
  public onError?: (error: any) => void
  public onModeChange?: (
    newMode: JsonEditorMode,
    oldMode: JsonEditorMode
  ) => void
  public escapeUnicode?: boolean
  public sortObjectKeys?: boolean
  public history?: boolean
  public mode?: JsonEditorMode
  public modes?: JsonEditorMode[]
  public name?: string
  public schema?: {}
  public schemaRefs?: object
  public search?: boolean
  public indentation?: number
  public theme?: string
  public language?: string
  public languages?: {}
  public isShowPrintMargin?: boolean
  public mainMenuBar?: boolean
  public navigationBar?: boolean
  public statusBar?: boolean

  constructor() {
    this.escapeUnicode = false
    this.sortObjectKeys = false
    this.history = true
    this.mode = 'code'
    this.modes = ['code', 'tree']
    this.search = true
    this.indentation = 2
    this.isShowPrintMargin = true
    this.statusBar = false
    this.mainMenuBar = false
  }
}

export interface Props extends WithStyles<typeof styles> {
  options?: JsonEditorOptions
  json?: object
  jsonModelFlat?: object
}

// export default withStyles(styles)(function JsonEditor(props: Props) {
//   let { options = {}, json, classes, jsonModelFlat = {} as any } = props;
//   const jsonEditorContainer = useRef<HTMLDivElement>(null);
//   options = Object.assign({}, new JsonEditorOptions(), options);

//   // 要加延迟,因为挂载jsonEditorContainer需要时间
//   setTimeout(() => {
//     const editor = new JSONEditor(jsonEditorContainer.current as HTMLDivElement, options, json) as any;
//     const aceEditor = editor.aceEditor;
//     const editorDom: HTMLElement = editor.editorDom;

//     // 右则添加字段描述信息
//     if (options.isShowPrintMargin && props.jsonModelFlat) {
//       aceEditor.setShowPrintMargin(true);
//       aceEditor.setPrintMarginColumn(40);

//       // 需要添加timeout时间，否则添加不上
//       setTimeout(() => {
//         let aceLinesNode = editorDom.querySelectorAll('.ace_line');
//         // 拷贝
//         const aceLines = Array.prototype.filter.call(aceLinesNode, (item, index) => {
//           if (index === 0) {
//             return false;
//           } else if (index == aceLinesNode.length - 1) {
//             return false;
//           }
//           return true;
//         });

//         const acePrintMargin = editorDom.querySelector('.ace_print-margin') as HTMLElement;
//         const acePrintMarginLeft = acePrintMargin.style.left;
//         const getFieldDesc = function (field: string, paths: string[]): ReactNode {
//           let desc = '';

//           if (paths.length > 0) {
//             desc = jsonModelFlat[`${paths.join('.')}.${field}.description`];
//           } else {
//             desc = jsonModelFlat[`${field}.description`]
//           }

//           return desc;
//         }

//         let paths: string[] = [];
//         aceLines.forEach(item => {
//           const aceVariable = item.querySelector('.ace_variable');

//           let field = '';
//           // 如果当前行是字段
//           if (aceVariable) {
//             field = (aceVariable.textContent as string).replace(/^"(.*)"$/g, '$1'); // 字段

//             const aceVariableDesc = item.querySelector('.ace_variable_desc');
//             if (!aceVariableDesc) {
//               // item.appendChild(document.createElement(aceVariableDescHtml))
//               const descSpan = document.createElement('span');
//               const id = (Math.random() + '').replace(/0\./g, '');
//               descSpan.setAttribute('id', id);
//               // descSpan.innerHTML = jsonModelFlat[`${field}.description`] || "";

//               item.appendChild(descSpan);

//               const element = React.createElement('span', {
//                 className: 'ace_variable_desc',
//                 style: { left: acePrintMarginLeft },
//               },
//                 getFieldDesc(field, paths)
//               );

//               document.getElementById(id) && ReactDOM.render(
//                 element,
//                 document.getElementById(id)
//               )

//               // switch (item.querySelector('.ace_paren') && item.querySelector('.ace_paren')!.textContent) {
//               //   case '{':
//               //     // paths.push(field)
//               //     // paths.push('$reflect')
//               //     paths = paths.concat(field, '$reflect')
//               //     break;
//               //   case '}':
//               //     paths = []
//               //     break;
//               // }
//             }
//           }

//           switch (item.querySelector('.ace_paren') && item.querySelector('.ace_paren')!.textContent) {
//             case '[':
//                 if (field) {
//                   paths.push(field)
//                 }
//                 paths.push('items')
//               // paths = paths.concat(field, 'items')
//               break;
//             case '{':
//               // paths.push(field)
//               // paths.push('$reflect')
//               if (field) {
//                 paths.push(field)
//               }
//               paths.push('$reflect')
//               break;
//             case ']':
//             case '}':
//               paths = []
//               break;
//           }
//         })
//       }, 800);
//     }
//   });

//   return (
//     <div className={classes.root} ref={jsonEditorContainer} style={{ minWidth: '550px' }}></div>
//   )
// })

export default withStyles(styles)(
  class extends React.PureComponent<Props & { ref: Ref<any> }> {
    private jsonEditorContainer = React.createRef<HTMLDivElement>()
    componentDidMount() {
      const props = this.props
      let { options = {}, json, jsonModelFlat = {} as any } = props
      const jsonEditorContainer = this.jsonEditorContainer
      options = Object.assign({}, new JsonEditorOptions(), options)
      // setTimeout(() => {
      const editor = new JSONEditor(
        jsonEditorContainer.current as HTMLDivElement,
        options,
        json
      ) as any
      const aceEditor = editor.aceEditor
      const editorDom: HTMLElement = editor.editorDom

      // 右则添加字段描述信息
      if (options.isShowPrintMargin && props.jsonModelFlat) {
        aceEditor.setShowPrintMargin(true)
        aceEditor.setPrintMarginColumn(40)

        // 需要添加timeout时间，否则添加不上
        setTimeout(() => {
          let aceLinesNode = editorDom.querySelectorAll('.ace_line')
          // 拷贝
          const aceLines = Array.prototype.filter.call(
            aceLinesNode,
            (item, index) => {
              if (index === 0) {
                return false
              } else if (index === aceLinesNode.length - 1) {
                return false
              }
              return true
            }
          )

          const acePrintMargin = editorDom.querySelector(
            '.ace_print-margin'
          ) as HTMLElement
          const acePrintMarginLeft = acePrintMargin.style.left
          const getFieldDesc = function(
            field: string,
            paths: string[]
          ): ReactNode {
            let desc = ''

            if (paths.length > 0) {
              desc = jsonModelFlat[`${paths.join('.')}.${field}.description`]
            } else {
              desc = jsonModelFlat[`${field}.description`]
            }

            return desc
          }

          let paths: string[] = []
          aceLines.forEach(item => {
            const aceVariable = item.querySelector('.ace_variable')

            let field = ''
            // 如果当前行是字段
            if (aceVariable) {
              field = (aceVariable.textContent as string).replace(
                /^"(.*)"$/g,
                '$1'
              ) // 字段

              const aceVariableDesc = item.querySelector('.ace_variable_desc')
              if (!aceVariableDesc) {
                // item.appendChild(document.createElement(aceVariableDescHtml))
                const descSpan = document.createElement('span')
                const id = (Math.random() + '').replace(/0\./g, '')
                descSpan.setAttribute('id', id)
                // descSpan.innerHTML = jsonModelFlat[`${field}.description`] || "";

                item.appendChild(descSpan)

                const element = React.createElement(
                  'span',
                  {
                    className: 'ace_variable_desc',
                    style: { left: acePrintMarginLeft }
                  },
                  getFieldDesc(field, paths)
                )

                document.getElementById(id) &&
                  ReactDOM.render(element, document.getElementById(id))

                // switch (item.querySelector('.ace_paren') && item.querySelector('.ace_paren')!.textContent) {
                //   case '{':
                //     // paths.push(field)
                //     // paths.push('$reflect')
                //     paths = paths.concat(field, '$reflect')
                //     break;
                //   case '}':
                //     paths = []
                //     break;
                // }
              }
            }

            switch (
              item.querySelector('.ace_paren') &&
                item.querySelector('.ace_paren')!.textContent
            ) {
              case '[':
                if (field) {
                  paths.push(field)
                }
                paths.push('items')
                // paths = paths.concat(field, 'items')
                break
              case '{':
                // paths.push(field)
                // paths.push('$reflect')
                if (field) {
                  paths.push(field)
                }
                paths.push('$reflect')
                break
              case ']':
              case '}':
                paths = []
                break
            }
          })
        }, 800)
      }
      // });
    }
    render() {
      const props = this.props
      let { classes } = props
      const jsonEditorContainer = this.jsonEditorContainer

      return (
        <div
          className={classes.root}
          ref={jsonEditorContainer}
          style={{ minWidth: '550px' }}
        ></div>
      )
    }
  }
)
