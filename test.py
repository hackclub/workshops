from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import time

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get('https://twitter.com/login')

email = "bajpaiharsh244@gmail.com"
password = "tod619thebull"

loginField = driver.find_element_by_xpath(
    '/html/body/div/div/div/div[2]/main/div/div/div[1]/form/div/div[1]/label/div/div[2]/div/input')

passwordField = driver.find_element_by_xpath(
    '/html/body/div/div/div/div[2]/main/div/div/div[1]/form/div/div[2]/label/div/div[2]/div/input')

loginButton = driver.find_element_by_xpath(
    '/html/body/div/div/div/div[2]/main/div/div/div[1]/form/div/div[3]/div')

######################## new code to add 👇 #######################

loginField.send_keys(email)
passwordField.send_keys(password)

time.sleep(1)

loginButton.click()
