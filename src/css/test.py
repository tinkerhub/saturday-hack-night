number = 25
factorial = 1
i = 1
while i < number:
    factorial *= i 
    i+=1

while len(str(factorial)) != 1:
    digitSum = 0
    for digit in str(factorial):
        digitSum += int(digit)
    factorial =  digitSum

print(factorial)