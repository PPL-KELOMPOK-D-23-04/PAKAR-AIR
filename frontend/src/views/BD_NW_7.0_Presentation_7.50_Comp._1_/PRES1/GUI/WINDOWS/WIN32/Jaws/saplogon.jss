
/*
 * JAWS Script file for SAPLogon
 *
 * Copyright
 *   SAP AG, www.sap.com
 *   Last Update : 2015/09/22 - for Screen Reader Extensions 2.52 (xSRX 42)
 */

include "HJConst.jsh"
include "HJGlobal.jsh"
include "common.jsm"
include "MSAAConst.jsh"

include "sapglobal.jsh"

void function SayTabControl ()
var
  int i,
  int nChildren,
  int nRole,
  int nState,
  string sName,
  object oTabPage,
  object oTabControl

  let oTabControl = GetCurrentObject (0)
  let nRole = oTabControl.accRole(0)
  let nChildren = oTabControl.accChildCount

  ; MessageBox (GetRoleText (nRole) + " - kids=" + IntToString(nChildren))

  let i = 1
  let sName = ""
  while (i <= nChildren)
    let nState = oTabControl.accState(i)
    if (nState & STATE_SYSTEM_SELECTED) then
      let sName = oTabControl.accName(i)
      let i = nChildren+1
    endif
    let i = i + 1
  endWhile

  IndicateControlType (WT_TABCONTROL, sName)

endFunction

void function SayObjectTypeAndText (int nLevel)
var
  int nType,
  handle hCurWnd,
  handle hPriorWnd,
  handle hNextWnd,
  object oFocus,
  int nState,
  string sLabel

  let nType = GetObjectSubTypeCode ()
  if (nType == WT_TABCONTROL) then
    ; RefreshWindow (GetFocus ())
    SayTabControl ()
    return
  endif

  if ((nLevel == 0) && (nType == WT_MULTILINE_EDIT)) then
    hCurWnd = GetCurrentWindow ()
    hNextWnd = GetNextWindow (hCurWnd)
    hPriorWnd = GetPriorWindow (hCurWnd)
    if ((GetWindowSubTypeCode (hNextWnd) == WT_SPINBOX) && (GetWindowSubTypeCode (hPriorWnd) == WT_RADIOBUTTON) && StringIsBlank(GetObjectName ())) then
      sLabel = GetWindowName (hPriorWnd)
      Say (GetGroupBoxName (), OT_CONTROL_GROUP_NAME)
      oFocus = GetCurrentObject (0)
      nState = oFocus.accState(0)
      IndicateControlType (WT_SPINBOX, sLabel)
      if (nState & STATE_SYSTEM_READONLY) then
        IndicateControlState (WT_SPINBOX, CTRL_GRAYED)
      endif
      return
    endif
  endif

  SayObjectTypeAndText (nLevel)

endFunction

Void function ActiveItemChangedEvent (handle hCurWnd, int nCurObjId, int nCurChildId,
  handle hPrevWnd, int nPrevObjId, int nPrevChildId)
var
  int nType

  let nType = GetObjectSubTypeCode ()
  if (((nType == WT_TREEVIEWITEM) || (nType == WT_TREEVIEWITEM)) && !MenusActive ()) then
    SayTreeViewLevel (false)
    ; SayObjectActiveItem (true)
    return
  elif (nType == WT_LISTBOXITEM) then
    SayObjectActiveItem (true)
    return
  endif

  ActiveItemChangedEvent (hCurWnd, nCurObjId, nCurChildId, hPrevWnd, nPrevObjId, nPrevChildId)

endFunction

int function BrailleAddObjectName (int nType)
var
  handle hCurWnd,
  handle hPriorWnd,
  handle hNextWnd,
  string sLabel

  if (nType == WT_EDIT_SPINBOX) then
    if (!StringIsBlank (GetObjectName ())) then
      return false
    endif
    hCurWnd = GetCurrentWindow ()
    hNextWnd = GetNextWindow (hCurWnd)
    hPriorWnd = GetPriorWindow (hCurWnd)
    if ((GetWindowSubTypeCode (hNextWnd) == WT_SPINBOX) && (GetWindowSubTypeCode (hPriorWnd) == WT_RADIOBUTTON)) then
      sLabel = GetWindowName (hPriorWnd)
      BrailleAddString (sLabel, GetCursorCol(), GetCursorRow(), 0)
      return true
    endif
  endif

  return false

endFunction

/*
int function SayTutorialHelpHotKey (handle hHotKeyWindow, int nIsScriptKey)
var
  int i,
  int nChildren,
  int nRole,
  int nState,
  string sHotKey,
  object oCurControl

  let oCurControl = GetCurrentObject (0)
  let nRole = oCurControl.accRole(0)

  if ((nRole == ROLE_SYSTEM_CHECKBUTTON) || (nRole == ROLE_SYSTEM_PUSHBUTTON)) then
    ; MessageBox (GetRoleText (nRole) + " - kids=" + IntToString(nChildren))
    let sHotKey = oCurControl.accKeyboardShortcut(0)
    ; Say (sHotKey, OT_HELP)
  endif
  let oCurControl = oNull

  return (SayTutorialHelpHotKey (hHotKeyWindow, nIsScriptKey))

endFunction
*/

script TestScript ()
  SayMessage (OT_POSITION, PositionInGroup ())
endScript

