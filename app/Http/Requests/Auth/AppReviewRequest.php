<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class AppReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'reviewer_name' => \App\Helpers\SanitizationHelper::sanitizeText($this->reviewer_name),
            'comment' => \App\Helpers\SanitizationHelper::sanitizeComment($this->comment, 2000),
        ]);
    }

    public function rules(): array
    {
        return [
            'reviewer_name' => ['required', 'string', 'min:2', 'max:100'],
            'rating' => ['required', 'integer', 'between:1,5'],
            'comment' => [
                'required', 
                'string', 
                'min:20', 
                'max:2000', 
                new \App\Rules\NoScriptInjection
            ],
        ];
    }
}
