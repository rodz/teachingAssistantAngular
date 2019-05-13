Feature: As a professor
         I want to delete students from my class
         So that I can clear my class

Scenario: Deleting Students already in my class
Given I am at the students page
Given I cannot see a student with CPF "683" in the students list
When I try to register the student "Paulo" with CPF "683"
Then I can see "Paulo" with CPF "683" in the students list
When I try to delete the student "Paulo" with CPF "683"
Then I cannot see student "Paulo" with CPF "683" in the students list

Scenario: Deleting 2 Students already in my class
Given I am at the students page
Given I can see no students in the students list
When I try to register the student "Rodrigo" with CPF "123" and github "rfrl"
When I try to register the student "Felipe" with CPF "456" and github "felipe"
Then I can see "Rodrigo" with CPF "123" in the students list
Then I can see "Felipe" with CPF "456" in the students list
When I try to delete the student "Rodrigo" with CPF "123"
When I try to delete the student "Felipe" with CPF "456"
Then I cannot see a student in the students list