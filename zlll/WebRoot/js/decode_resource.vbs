Function URLEncode(str) 
    Dim s,c,a,t 
    For i=1 To Len(str) 
        c = Mid(str,i,1) 
        a = ASC(c) 
        If a<0 OR a>255 Then 
            t=Hex(a) 
            While len(t) mod 2 > 0 
                t = "0" & t 
            Wend 
            For j=1 To len(t)-1 Step 2 
                s = s & "%" & Mid(t,j,2) 
            Next 
        ElseIf a=32 Then 
            s = s & "+" 
        ElseIf (a>=48 and a<=57) or (a>=65 and a<=90) or (a>=97 and a<=122) Then 
            s = s & c 
        ElseIf a>0 and a<16 Then 
            s = s & "%0" & Hex(a) 
        ElseIf a>=16 and a<256 Then 
            s = s & "%" & Hex(a) 
        Else 
            s = s & c 
        End If 
    Next 
    URLEncode = s 
End Function 

Function URLDecode(input) 
    Dim str,code,a(3),b(1) 
    str="" 
    code=input 
    code=Replace(code,"+"," ") 
    Const hexstr = "0123456789ABCDEF" 
    While len(code)>0 
        If InStr(code,"%")>0 Then 
            str = str & Mid(code,1,InStr(code,"%")-1) 
            code = Mid(code,InStr(code,"%")) 
            a(0) = UCase(Mid(code,2,1)) 
            a(1) = UCase(Mid(code,3,1)) 
            If a(1)<>"" And InStr(hexstr,a(0))>0 And InStr(hexstr,a(1))>0 Then 
                b(0) = Eval("&H" & a(0) & a(1)) 
                If b(0)>127 And Mid(code,4,1)="%" And len(code)>=6 Then 
                    a(2) = UCase(Mid(code,5,1)) 
                    a(3) = UCase(Mid(code,6,1)) 
                    If a(3)<>"" And InStr(hexstr,a(2))>0 And InStr(hexstr,a(3))>0 Then 
                        b(1) = Eval("&H" & a(2) & a(3)) 
                        str = str & chr(b(0)*256+b(1)) 
                        code = Mid(code,7) 
                    Else 
                        str = str & "%" 
                        code = Mid(code,2) 
                    End If 
                Else 
                    str = str & chr(b(0)) 
                    code = Mid(code,4) 
                End If 
            Else 
                str = str & "%" 
                code = Mid(code,2) 
            End If 
        Else 
            str = str & code 
            code = "" 
        End If 
    Wend 
    URLDecode = str 
End Function 

