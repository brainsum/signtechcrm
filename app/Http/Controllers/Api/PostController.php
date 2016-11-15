<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\CompletedForm;
use Carbon\Carbon;
use GuzzleHttp\Client;
use \Storage;

class PostController extends Controller
{
    /**
     * 
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $completedForm = new CompletedForm;
        $completedForm->user_id = 1; // @todo - I should get this too
        $completedForm->form_id = $request->input('json')['form_id'];
        $completedForm->title = $this->getFormTitleByFormId($completedForm->form_id);
        $completedForm->data = $this->getData($request->input('json'));
        $completedForm->file = $this->downloadFile($request->input('file'));
        $completedForm->save();
    }

    /**
     * Get the form's title through the API
     *
     * @param int $formId
     * @return string
     */
    private function getFormTitleByFormId($formId) {
        $client = new Client;

        $data = [
            'form_params' => [
                'function' => 'form_by_id',
                'id' => $formId
            ]
        ];

        $http_auth_credentials = config('signtechapi.http_auth_credentials');
        if ($http_auth_credentials) {
            $data['auth'] = explode(':', $http_auth_credentials);
        }

        $response = $client->post(config('signtechapi.url'), $data);
        $data = json_decode($response->getBody());

        return $data->form_title;
    }

    /**
     * Get form data (the json field from the request without the form_id field)
     *
     * @param array $json
     * @return array
     */
    private function getData($json) {
        $data = $json;
        unset($data['form_id']);

        return $data;
    }

    /**
     * Download and store file locally
     *
     * @param string $file
     * @param string local filename
     */
    private function downloadFile($path) {
        $path = base64_decode($path);
        $filename = basename($path);
        $content = file_get_contents($path);
        
        Storage::disk('pdfs')->put($filename, $content);

        return $filename;
    }
}
