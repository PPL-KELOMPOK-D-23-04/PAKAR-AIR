
/*
 * Main header file for SAPGUI.
 *
 * Copyright
 *   SAP AG, www.sap.com
 *   Last Update : 2015/10/06
 */

/*
 * Constants
 */
Const
  ; Type codes of GuiComponents
  GUI_TC_UNKNOWN = 4294967295,
  GUI_TC_COMPONENT = 0,
  GUI_TC_VCOMPONENT = 1,
  GUI_TC_VCONTAINER = 2,
  GUI_TC_APLLICATION = 10,
  GUI_TC_CONNECTION = 11,
  GUI_TC_SESSION = 12,
  GUI_TC_FRAMEWINDOW = 20,
  GUI_TC_MAINWINDOW = 21,
  GUI_TC_MODALWINDOW = 22,
  GUI_TC_LABEL = 30,
  GUI_TC_TEXTFIELD = 31,
  GUI_TC_CTEXTFIELD = 32,
  GUI_TC_PASSWORDFIELD = 33,
  GUI_TC_COMBOBOX = 34,
  GUI_TC_OKCODEFIELD = 35,
  GUI_TC_BUTTON = 40,
  GUI_TC_RADIOBUTTON = 41,
  GUI_TC_CHECKBOX = 42,
  GUI_TC_CUSTOMCONTROL = 50,
  GUI_TC_CONTAINERSHELL = 51,
  GUI_TC_BOX = 62,
  GUI_TC_CONTAINER = 70,
  GUI_TC_SIMPLECONTAINER = 71,
  GUI_TC_SCROLLCONTAINER = 72,
  GUI_TC_USERAREA = 74,
  GUI_TC_TABLECONTROL = 80,
  GUI_TC_TABLECOLUMN = 81,
  GUI_TC_TABLEROW = 82,
  GUI_TC_TABSTRIP = 90,
  GUI_TC_TAB = 91,
  GUI_TC_SCROLLBAR = 100,
  GUI_TC_TOOLBAR = 101,
  GUI_TC_TITLEBAR = 102,
  GUI_TC_STATUSBAR = 103,
  GUI_TC_MENU = 110,
  GUI_TC_MENUBAR = 111,
  GUI_TC_COLLECTION = 120,
  GUI_TC_SESSIONINFO = 121,
  GUI_TC_GUISHELL = 122,
  GUI_TC_GOSHELL = 123,
  GUI_TC_SPLITTERSHELL = 124, 
  GUI_TC_DIALOGSHELL = 125, 
  GUI_TC_DOCKSHELL = 126, 
  GUI_TC_CONTEXTMENU = 127, 
  ;
  ; Braille custom control types
  ;
  GUI_WT_CHECKBOX=1,
  GUI_WT_RADIOBUTTON=2,
  GUI_WT_BUTTON=3,
  GUI_WT_TEXTFIELD=4,
  GUI_WT_CTEXTFIELD=5,
  GUI_WT_COMBOBOX=6,
  GUI_WT_TABLECONTROL=7,
  GUI_WT_TAB=8,
  GUI_WT_SHELL_TV=9,
  GUI_WT_LABEL=10,
  GUI_WT_GRIDVIEW=11,
  GUI_WT_CALENDAR=12,
  GUI_WT_PASSWORDFIELD=13,
  GUI_WT_TOOLBAR=14,
  GUI_WT_PICTURE=15,
  GUI_WT_SPLITTERSHELL=16,
  GUI_WT_CONTAINER=17,
  ;
  ; GuiTree control: tree types
  ;
  GUI_TREETYPE_SIMPLE=0,
  GUI_TREETYPE_LIST=1,
  GUI_TREETYPE_COLUMN=2,
  ;
  ; GuiTree control: item types
  ;
  GUI_TREEITEMPTYPE_HIERARCHY = 0,
  GUI_TREEITEMPTYPE_IMAGE = 1,
  GUI_TREEITEMPTYPE_TEXT = 2,
  GUI_TREEITEMPTYPE_BOOL = 3,
  GUI_TREEITEMPTYPE_BUTTON = 4,
  GUI_TREEITEMPTYPE_LINK = 5,
  ;
  ; GuiTree control: selection modes
  ;
  GUI_SM_SINGLE_NODE=0,
  GUI_SM_MULTIPLE_NODE=1,
  GUI_SM_SINGLE_ITEM=2,
  GUI_SM_MULTIPLE_ITEM=3,
  ;
  ; Office Integration
  ;
  GUI_OI_UNKNOWN=0,
  GUI_OI_WORD=1,
  GUI_OI_EXCEL=2,
  GUI_OI_POWERPOINT=3,
  GUI_OI_PROJECT=4,
  GUI_OI_VISIO=5,
  GUI_OI_WORDPRO=6,
  GUI_OI_LOTUS123=7,
  GUI_OI_WORDPERFECT=8,
  GUI_OI_SAPOROS=9,
  GUI_OI_PSPLANNINGMODELLER=10,
  GUI_OI_ADOBE=11

Const
  SapGuiJsiFileName="sapfront.jsi",
  ; application verbosity settings
  Section_SapGuiVerbositySettings="Application Verbosity Settings",
  Key_SapGuiAccVerbosity="AccVerbosityLevel",
  Key_SapGuiSteploopMode="SteploopMode",
  Key_SapGuiProgressBarMode="ProgressBarAnnouncement",
  Key_SapGuiMultipleSelection="MultipleSelections",
  ; keycodes used in KeypressedEvent
  kiEsc=1,
  kiBackspace=14,
  kiEnter=28,
  kiSpaceBar=57,
  kiF2=60,
  kiF3=61,
  kiF8=66,
  kiF9=67,
  kiCursorLeft=75,
  kiCursorRight=77,
  kiDelete=83,
  kiContext=93,
  kiContextLShftF10=2097220,
  kiContextRShftF10=1048644,
  kiLeftCtrlShift7=2097672,
  kiRightCtrlShift7=1048840,
  kiCtrlSpace=32825,
  kiCtrlTab=65551,
  kiAltMask=524288,
  kiCtrlAltMask=524800,
  cksSapControlUpArrow="control+uparrow",
  cksSapControlDownArrow="control+downarrow",
  cksSapBackspace="backspace",
  cwnSapTaskSwitch="#32771"
Const
  ;
  ; Some SAPGUI names used  for controls
  ;
  sGuiInteger="integer",
  sGuiString="string",
  sGuiGridView="GridView",
  sGuiCtrlApoGrid="ApoGrid",
  sGuiCheckbox="Checkbox",
  sGuiRadioButton="RadioButton",
  sGuiButton="Button",
  sGuiMenu="Menu",
  sGuiButtonAndMenu="ButtonAndMenu",
  sGuiSeparator="Separator",
  sGuiGroup="Group",
  sGuiNormal="Normal",
  sGuiValueList="ValueList",
  ; sGuiValueList="f4 edit",
  sGuiIcon= "Icon",
  sGuiSymbol="Symbol",
  sGuiCTextField="F4 Edit",
  /* sGuiLink="Link", -- unused */
  sGuiExpander="Expander",
  sGuiNone="None",
  sGuiAscending="Ascending",
  sGuiDescending="Descending",
  sGuiTree="Tree",
  sGuiCalendar="Calendar",
  sGuiHtmlViewer="HTMLViewer",
  sGuiOfficeIntegration="OfficeIntegration",
  sGuiToolbar="Toolbar",
  sGuiPicture="Picture",
  sGuiTextEdit="TextEdit",
  sGuiAbapEditor="AbapEditor",
  sTextEditClass="SAP TextEdit",
  sTextEditBodyClass="TextEditBody",
  sShellClass="Shell Window Class",
  sContainerClass="Container Class",
  sCalendarClass="SAP Calendar",
  sAbapEditorClass="AfxMDIFrame80u",
  sALVGridControlClass="SAPALVGridControl",
  sSysPagerClass="SysPager",
  sStateChecked="x",
  sStatusBarMessageSuccess="S",
  sStatusBarMessageError="E",
  sStatusBarMessageWarning="W",
  sStatusBarMessageAbort="A",
  sStatusBarMessageInformation="I",
  sALVIsHotspotProperty="HS",
  sALVIsLinkProperty="L",
  sSelModeSingleRow="ListboxSingle",
  sSelModeMultipleRows="ListboxMultiple",
  sSelModeRowsAndColumns="RowsAndColumns",
  sSelModeFree="Free"

Const
  ;
  ; for ABAP lists
  ; Label Types
  LT_NORMALHEADER="N",
  LT_SUPERCOLUMNHEADER="H",
  LT_TITLE="T",
  LT_GROUPHEADER="A",
  LT_GROUPLABEL="G",
  LT_SUBGROUPLABEL="S",
  ; Container Types
  CT_LIST="L",
  CT_TABLE = "T",
  CT_GROUP="G",
  CT_SUBGROUP="S",
  CT_ROW="R",
  CT_TEXTBOX="B",
  CT_TREE="E",
  CT_FREETEXT="F",
  ; RowTypes
  RT_U="U",
  RT_S="S",
  RT_I="I",
  ; ColorIndex
  CI_READONLY=2 ,
  CI_KEY=4,
  CI_THRESHOLD=5,
  CI_NEGATIVE=6,
  ; ListInputTypes
  LIT_NONE="N",
  LIT_CHECKBOXES="C",
  LIT_EDITFIELDS="E",
  LIT_ALL="A",

  ; Tree Types
  TT_SimpleTree=0,
  TT_ListTree=1,
  TT_ColumnTree=2,

  ; Split/docking view types
  SDT_SPLITHORIZONTAL = 0,
  SDT_SPLITVERTICAL = 1,
  SDT_DOCKSHELLHORIZONTAL = 2,
  SDT_DOCKSHELLVERTICAL = 3

Const
  sSystemToolbarName = "tbar[0]",
  sApplicationToolbarName = "tbar[1]",
  sBtnNameSave = "btn[11]",
  sBtnNameBack = "btn[3]",
  sBtnNameExit = "btn[15]",
  sBtnNameCancel = "btn[12]",
  sBtnNamePrint = "btn[86]",
  sBtnNameFind = "btn[71]",
  sBtnNameFindNext = "btn[84]",
  sBtnNameFirstPage = "btn[80]",
  sBtnNamePreviousPage = "btn[81]",
  sBtnNameNextPage = "btn[82]",
  sBtnNameLastPage = "btn[83]",
  sBtnNameCreateSession = "btn[419]",
  sBtnNameGenerateShortcut = "btn[418]",
  sBtnNameStartAccCheck = "btn[422]",
  sBtnNameHelp = "btn[1]",
  sBtnNameOkCode = "btn[0]",
  /* ROM 2010/08/06 - more button names in signature design */
  sBtnNameCommandField = "btn[423]",
  sBtnNameLocalLayout = "btn[446]"

const
  GUI_OPT_SCREEN_ECHO = 8 /* old output type for JAWS 11 */

/*
 * Global definitions
 */

Globals
  int g_bOnFocusChanged,
  int g_nObjectTypeCode,
  int g_nSapGuiAccVerbosity,
  int g_nSapGuiSteploopMode,
  int g_nMultipleSelectionVerbosity

/*
 **********************************************************************
 * Custom control variables
 **********************************************************************
 */

Globals
  ;
  ; GuiComponent
  ;
  int g_bGuiComponentIsValid,
  int g_bGuiComponentSameAsPrevious,
  int g_nGuiComponentLastUpdate,
  object g_oGuiComponent,
  object g_oGuiComponentParent,
  int g_nGuiComponentType,
  int g_nGuiComponentPreviousType,
  int g_nGuiComponentParentType,
  int g_nGuiComponentPreviousParentType,
  string g_sGuiComponentParentId,
  string g_sGuiComponentPreviousParentId,
  string g_sGuiComponentFrameId,
  string g_sGuiComponentPreviousFrameId,
  string g_sGuiComponentPreviousSubType,
  int g_nGuiComponentLeft,
  int g_nGuiComponentTop,
  int g_nGuiComponentWidth,
  int g_nGuiComponentHeight,
  int g_bGuiComponentChangeable,
  string g_sGuiComponentSubType,
  string g_sGuiComponentId,
  string g_sGuiComponentParentColumnName,
  string g_sGuiComponentParentColumnTooltip,
  string g_sGuiComponentParentTabText,
  string g_sGuiComponentPreviousTabText,
  handle g_hGuiFrameWnd,
  string g_sGuiComponentTooltip,
  string g_sGuiComponentAccLabels,
  string g_sGuiComponentAccTooltip,
  string g_sGuiComponentAccText,
  string g_sGuiComponentAccDescription,
  ;
  ; GuiCheckbox
  ;
  int g_bGuiCheckBoxIsValid,
  int g_bGuiCheckBoxState,
  string g_sGuiCheckBoxText,
  string g_sGuiCheckBoxToolTip,
  ;
  ; GuiBox
  ;
  int g_bGuiBoxIsValid,
  int g_bGuiBoxShouldSpeak,
  string g_sGuiBoxText,
  string g_sGuiBoxSpeakText,
  string g_sGuiBoxTooltip,
  ;
  ; GuiTab
  ;
  int g_bGuiTabIsValid,
  int g_bGuiTabIsSelected,
  int g_iGuiTabTotalCount,
  int g_iGuiTabCurrentIndex,
  string g_sGuiTabText,
  string g_sGuiTabTooltip,
  ;
  ;GuiTextFields
  ;
  int g_bGuiTextFieldIsValid,
  int g_bGuiTextFieldNumerical,
  int g_bGuiTextFieldReadOnly,
  int g_bGuiTextFieldHighlighted,
  int g_bGuiTextFieldRequired,
  int g_bGuiTextFieldIsHotspot,
  int g_bGuiTextAttachedToRadioButton,
  string g_sGuiTextFieldText,
  ; string g_sGuiTextFieldLeftLabel,
  ; string g_sGuiTextFieldRightLabel,
  string g_sGuiTextFieldTooltip,
  string g_sGuiTextFieldParentColumnName,
  string g_sGuiTextFieldIcon,
  ;
  ; ROM 2010/01/15 - for handling of history
  ;
  int g_bGuiTextFieldHistoryIsActive,
  int g_nGuiTextFieldHistoryCurIndex,
  int g_nGuiTextFieldHistoryEntries,
  string g_sGuiTextFieldHistoryCurEntry,
  ; GuiRadioButton
  ;
  int g_bGuiRadioButtonIsValid,
  int g_bGuiRadioButtonState,
  int g_nGuiRadioButtonGroupPos,
  int g_nGuiRadioButtonGroupCount,
  string g_sGuiRadioButtonText,
  string g_sGuiRadioButtonToolTip,
  ;
  ; GuiLabel
  ;
  int g_bGuiLabelIsValid,
  int g_bGuiLabelNumerical,
  int g_bGuiLabelHighlighted,
  int g_nGuiLabelCaretPosition,
  string g_sGuiLabelText,
  string g_sGuiLabelTooltip,
  string g_sGuiLabelAccText,
  string g_sGuiLabelAccTextOnRequest,
  int g_bGuiLabelIsHotspot, 
  int g_bGuiLabelIsSymbolFont,
  string g_sGuiLabelIcon,
  ;
  ; used for various dynpros
  ;
  string g_sLeftLabelText,
  string g_sRightLabelText,
  string g_sLeftLabelTooltip,
  string g_sRightLabelTooltip,
  ;
  ; GuiOkCodeField
  ;
  int g_bGuiOkCodeFieldIsValid,
  ;
  ; GuiButton
  ;
  int g_bGuiButtonIsValid,
  string g_sGuiButtonTooltip,
  string g_sGuiButtonText,
  int g_bGuiButtonIsTableSettings ,
  ;
  ; GuiComboBox
  ;
  int g_bGuiComboboxIsValid,
  string g_sGuiComboboxTooltip,
  string g_sGuiComboboxText,
  string g_sGuiComboboxCurListboxEntry,
  int g_bGuiComboboxParentIsToolbar,
  int g_bGuiComboboxIsListboxActive,
  int g_bGuiComboboxReadOnly, 
  int g_bGuiComboboxRequired,
  int g_bGuiComboboxHighlighted,
  int g_nGuiComboboxEntries,
  int g_nGuiComboboxPos,
  ;
  ; GuiTableControl
  ;
  int g_iDummy,
  int g_bGuiTableControlIsValid,
  string g_sGuiTableControlName,
  string g_sGuiTableControlTitle,
  int g_iGuiTableControlColCount,
  int g_iGuiTableControlRowCount,
  int g_iGuiTableControlVisibleRowCount, 
  int g_iGuiTableControlCurCol,
  int g_iGuiTableControlCurRow,
  int g_iGuiTableControlRowOffset,
  int g_bNewColumn,
  int g_bNewTable,
  int g_bNewRow,
  int g_bForceReadCell,
  int g_bCurRowIsSelected,
  int g_bCurColIsSelected,
  int g_bCurCellIsSelected,
  int g_bTableRowSelectable,
  ;
  ; GuiShell
  ; GuiCtrlGridView - ALV
  ;
  int g_bGuiShellIsValid ,
  string g_sGuiALVTitle,
  string g_sGuiALVValue,
  string g_sGuiALVColumnTitle,
  string g_sGuiAlvColumnLongTitle,
  string g_sGuiALVColumnTooltip,
  int g_iGuiALVRowCount,
  int g_iGuiALVColumnCount, 
  int g_iGuiALVCurRow,
  int g_iGuiALVCurColumn,
  int g_iGuiALVVisibleRowCount, 
  int g_iGuiALVToolbarFocusButton,
  int g_bGuiALVCellChangeable,
  int g_bGuiALVCellSelected,
  int g_iGuiALVToolbarPreviousButton,
  string g_sGuiALVSelectionMode,
  string g_sALVCellType,
  string g_sALVPreviousCellType,
  string g_sALVCellProperty,
  string g_sALVPreviousCellProperty,
  int g_iGuiALVBoolState, 
  int g_bColIsKey,
  int g_bColIsFiltered,
  string g_sColIsSorted,
  int g_bTotalRowExpanded,
  int g_iTotalRowLevel,
  int g_bIsCellHotspot,
  int g_bIsCellLink, /* later ...*/
  string g_sCellTooltip,
  string g_sCellColorInfo,
  ;
  ; GuiCtrlTree
  ;
  int g_iGuiCtrlTreePreviousLevel,
  int g_iGuiCtrlTreeType,
  int g_iGuiCtrlTreeSelectionMode,
  int g_iNodesCount,
  string g_sNodeText,
  string g_sItemText, 
  int g_iItemType,
  int g_iNodeLevel,
  int g_iCurLevelCount,
  int g_iSubLevelCount,
  int g_iCurPosition, 
  string g_sColumnKey,
  string g_sColumnTitle,
  int g_iColumnIndex, 
  int g_bNewTreeColumn,
  int g_bNodeIsSelected,
  string g_sKey,
  string g_sKey2,
  string g_sAllItemsText,
  string g_sFocusedNodeKey,
  string g_sFocusedNodeText,
  string g_sNodeTooltip,
  string g_sItemTooltip,
  string g_sNodeStyle,
  string g_sitemStyle,
  int g_iIsFolder,
  int g_iIsFolderExpanded,
  int g_iIsFolderExpandable,
  int g_iIsDisabled,
  int g_iIsEditable,
  int g_bForceReadNodeInfo,
  int g_iCheckBoxState, /* note: indicates checkbox state in trees and ALVs */
  string g_sGuiCtrlTreeNodeFullText,
  string g_sGuiCtrlTreeColumnTitles,
  ;
  ; GuiCtrlCalendar
  ;
  int g_iDay,
  int g_iMonth,
  int g_iYear,
  int g_iWeekNumber,
  string g_sWeekday,
  string g_sCalTooltip,
  ;
  ; GuiStatusbar
  ;
  handle g_hGuiStatusBar,
  ;
  ; ABAP-Lists / Trees (Labels)
  ;
  int g_bGuiContainerIsValid,
  int g_bLstIsListElement,
  int    g_nLstListTablesTotal,
  int    g_nLstListTreesTotal,
  int    g_nLstListTextBoxesTotal,
  string g_sLstListInputType,

  string g_sLstTextBoxNo,
  string g_sAccTextOnRequest,
  string g_sLstFieldHeader,
  string g_sLstFieldSuperHeader,   
  int    g_nLstRowsTotal,
  int    g_nLstRowInputFields,
  int    g_nLstRowNo,
  string g_sLstRowType,

  string g_sLstRowsSubSummation,
  string g_sLstRowsSummation,
  string g_sLstContainerInputFields,
  int    g_nLstTableGroupsTotal,

  int    g_nLstColsTotal,
  int    g_nLstColNo,
  string g_sLstLabelType,
  string g_sLstTitle,
  string g_sLstContainerType,
  string g_sLstPreviousContainerType,
  string g_sLstRowType,
  int    g_nLstTableGroupsTotal,
  int    g_nLstGroupNo,
  int    g_nLstSubGroupNo,
  string g_sLstLabelText,
  string g_sLstListErrorMessage,

  int    g_nLstSubordinateColumns,
  int    g_nLstListTablesTotal,
  int    g_nLstTableNo,
  int    g_nLstTreeNo,
  int    g_nLstTextBoxNo,

  string g_sLstTableHierarchical,
  string g_sLstContainerTitle,

  int    g_nLstColumns2LevelALV,
  int    g_nLstContainerInputFields,
  int    g_nLstSubgroupsTotal,
  int    g_nLstSuperColumnsTotal,
  int    g_nLstGroupHeaderRows, 
  int    g_nLstGroupHeaderValues,
  int    g_nLstLineCount,
  int    g_nlstLineNo,

  int    g_nLstLastTableNo,
  int    g_nLstLastTreeNo,
  int    g_nLstLastTextBoxNo,
  int    g_nLstLastGroupNo,
  int    g_nLstLastColumnNo,
  int    g_nLstLastRowNo,
  int    g_nLstLastGroupNo,
  int    g_nLstLastSubGroupNo,
  
  string g_sLstRowText,
  string g_sLstLastRowText,
  int g_bLstColorIndex,
  int g_bLstColorIntensified,
  int g_bLstColorInverse,
  int      g_bLstLabelIsIcon,
  ; ListTree
  int    g_nTreeNo,
  int    g_nNodeLevelNo,
  int    g_nNodeNo,
  int    g_nNodeChildrenTotal,
  int    g_nNodeRealChildrenTotal,
  int    g_nNodeMultipleRows,
  int    g_bNodeExpandable,
  int    g_bNodeMarked,
  string g_sNodeName,
  ; TextBox
  string g_sLstContainerTitle,
  ;
  ; Toolbar
  ;
  int g_bToolbarIsValid,
  int g_nToolbarFocusedButton,
  int g_nToolbarButtonCount,
  int g_bToolbarButtonChecked,
  int g_bToolbarButtonEnabled,
  string g_sToolbarButtonText,
  string g_sToolbarButtonType,
  string g_sToolbarButtonTooltip,
  string g_sToolbarButtonIcon,
  ;
  ;GuiCtrlPicture
  ;
  int g_bGuiPictureIsValid,
  string g_sGuiPictureIcon,
  string g_sGuiPictureUrl,
  string g_sGuiPictureAltText,
  ;
  ; GuiCtrlTextEdit
  ;
  int g_bGuiTextEditIsValid,
  string g_sGuiTextEditLineText,
  int g_iGuiTextEditFirstVisibleLine,
  int g_iGuiTextEditLastVisibleLine,
  int g_iGuiTextEditLineCount,
  int g_iGuiTextEditCurrentLine,
  int g_iGuiTextEditCurrentColumn,
  int g_iGuiTextEditSelectionStartLine,
  int g_iGuiTextEditSelectionStartColumn,
  int g_iGuiTextEditSelectionEndLine,
  int g_iGuiTextEditSelectionEndColumn,
  string g_sGuiTextEditSelectedText,
  int g_bGuiTextEditIsCommentLine,
  int g_bGuiTextEditIsProtectedLine,
  int g_bGuiTextEditIsBreakPointLine,
  int g_bGuiTextEditIsSelectedLine,
  int g_bGuiTextEditIsHighlightedLine,
  ;
  ; GuiSplitterShell
  ;
  int g_bGuiSplitterShellIsValid,
  int g_nGuiSplitterShellType,
  int g_nGuiSplitterShellPos1,
  int g_nGuiSplitterShellPos2,
  ;
  ; OTFPreview
  ;
  int g_bIsOTFPreview,
  ;
  ; SimpleShell
  ;
  ; int g_bGuiSimpleShellIsValid,
  ;
  ; GuiSimpleContainer - StepLoop
  ;
  ; 
  string g_sStepLoopId,
  string g_sStepLoopColTitle,
  int g_bIsStepLoop,
  int g_iLoopColCount,
  int g_iLoopRowCount,
  int g_iLoopCurrentCol,
  int g_iLoopCurrentRow,
  int g_bNewStepLoop,
  ;
  ; APO
  ;
  int g_bGuiCtrlApoGridIsValid,
  int g_nGuiCtrlApoGridColumnCount,
  int g_nGuiCtrlApoGridRowCount,
  int g_nGuiCtrlApoGridVisibleRowCount,
  int g_nGuiCtrlApoGridVisibleColumnCount,
  int g_nGuiCtrlApoGridCurrentColumn,
  int g_nGuiCtrlApoGridCurrentRow,
  int g_nGuiCtrlApoGridFixedRowsBottom,
  int g_nGuiCtrlApoGridFixedRowsTop,
  int g_nGuiCtrlApoGridFixedColumnsLeft,
  int g_nGuiCtrlApoGridFixedColumnsRight,
  int g_bGuiCtrlApoGridCellChangeable,
  string g_sGuiCtrlApoGridCellValue,
  string g_sGuiCtrlApoGridCellFormat,
  string g_sGuiCtrlApoGridCellTooltip,
  string g_sGuiCtrlApoGridColumnHeader,
  string g_sGuiCtrlApoGridRowHeader,
  string g_sGuiCtrlApoGridTitle,
  ;
  ; Verbosity Globals
  ;
  int g_bTableColumnHeaders,
  int g_bTableRowPosition,
  ;
  ; Popup dialog boxes
  ;
  int g_bIsPopupDialog,
  string g_sPopupDialogText,
  ;
  ; Real window
  ;
  handle g_hRealWindow,
  handle g_hPreviousRealWindow,
  ;
  ; Application window
  ;
  string g_sAppMainWindowTitle,
  int g_bWindowTitleChanged,
  ;
  ; to identify system and application toolbar
  ;
  int g_bIsApplicationToolbar,
  int g_bIsSystemToolbar,
  ;
  ; GuiCtrlAbapEditor
  ;
  int g_bGuiAbapEditorIsValid,
  int g_bGuiAbapEditorIsCommentLine,
  int g_nGuiAbapEditorCursorLine,
  int g_nGuiAbapEditorCursorColumn,
  int g_nGuiAbapEditorLineCount,
  int g_bGuiAbapEditorIsBookmark,
  int g_bGuiAbapEditorIsBreakpointSet,
  int g_bGuiAbapEditorIsLineModified,
  int g_bGuiAbapEditorIsLineCollapsed,
  int g_nGuiAbapEditorBlockStartLine,
  int g_nGuiAbapEditorBlockEndLine,
  int g_bGuiAbapEditorIsAutoCompleteOpen,
  int g_nGuiAbapEditorAutoCompleteIndex,
  int g_nGuiAbapEditorAutoCompleteCount,
  int g_nGuiAbapEditorAutoCompleteDelay,
  string g_sGuiAbapEditorAutoCompleteText,
  string g_sGuiAbapEditorLine,
  string g_sGuiAbapEditorBookmarkList,
  string g_sGuiAbapEditorAutoCompleteTooltip,
  string g_sGuiAbapEditorAutoCompleteIcon,
  string g_sGuiAbapEditorAutoCompleteToolbarHelp,

;For column review - KK
  int g_bColReviewState,
int g_iColReviewValue,
int g_iColReviewTemp,
string g_sColReviewText,
  string g_sColReviewValue,
  string g_sColReviewTemp,
int g_bIsGridView