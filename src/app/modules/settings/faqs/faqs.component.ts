import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaqService } from '@proxy/controllers';
import { IconsComponent } from "../../../shared/icons/icons.component";
import { SettingsSidebarComponent } from "../settings-sidebar/settings-sidebar.component";

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IconsComponent, SettingsSidebarComponent],
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FAQsComponent {
  questionAnswerForm: FormGroup;
  isEditable: boolean[] = [];

  constructor(
    private fb: FormBuilder,
    private faqsService: FaqService
  ) {
    this.questionAnswerForm = this.fb.group({
      questions: this.fb.array([])
    });

    this.addQuestion();
  }

  // Get the form array of questions
  get questions(): FormArray {
    return this.questionAnswerForm.get('questions') as FormArray;
  }

  // Create a new question-answer form group
  createQuestionAnswer(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }

  // Add a new question-answer form group to the form array
  addQuestion() {
    this.questions.push(this.createQuestionAnswer());
    this.isEditable.push(false); // Initially readonly
  }

  // Remove a question-answer form group from the form array
  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
      this.isEditable.splice(index, 1);
    }
  }

  // Toggle edit mode for a question-answer group
  toggleEdit(index: number) {
    this.isEditable[index] = !this.isEditable[index];
  }

  // Save the form data
  onSave() {
    if (this.questionAnswerForm.valid) {
      const faqsData = this.questionAnswerForm.value.questions;
      console.log('faqsData:', faqsData);
      this.faqsService.create(faqsData).subscribe(
        response => {
          console.log('FAQs submitted successfully:', response);
          this.resetForm(); // Reset the form after successful submission
        },
        error => {
          console.error('Error submitting FAQs:', error);
        }
      );
    } else {
      this.questionAnswerForm.markAllAsTouched();
    }
  }

  // Reset form after submission
  resetForm() {
    this.questionAnswerForm.reset();
    while (this.questions.length) {
      this.questions.removeAt(0);
    }
    this.isEditable = [];
    this.addQuestion();
  }
}
