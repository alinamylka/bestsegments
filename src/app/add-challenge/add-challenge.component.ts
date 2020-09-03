import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Challenge} from '../challenge/challenge';
import {ChallengesStoreService, ChallengeStoreDto} from '../challenges/challenges-store.service';
import {LoaderService} from '../layout/loader/loader.service';

@Component({
    selector: 'app-add-challenge',
    templateUrl: './add-challenge.component.html',
    styleUrls: ['./add-challenge.component.css']
})
export class AddChallengeComponent implements OnInit {
    formSubmitted = false;
    myForm: FormGroup;

    name: FormControl;
    startDate: FormControl;
    segments: FormControl;
    endDate: FormControl;

    constructor(private challengeService: ChallengesStoreService,
                private router: Router,
                private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.name = new FormControl('', Validators.required);
        this.startDate = new FormControl('', Validators.required);
        this.segments = new FormControl('', Validators.required);
        this.endDate = new FormControl('', [Validators.required]);

        this.myForm = new FormGroup({
            name: this.name,
            segments: this.segments,
            startDate: this.startDate,
            endDate: this.endDate
        });

    }

    addChallenge(challengeStoreDto: ChallengeStoreDto) {
        this.loaderService.showLoader();
        this.challengeService.add(challengeStoreDto).subscribe(result => {
            this.formSubmitted = true;
            this.loaderService.hideLoader();
            this.router.navigateByUrl('/challenges');
        });
    }
}
